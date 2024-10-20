import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import uuid from "react-native-uuid";
import useStore from "@/store/store";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import TopBar from "@/components/common/TopBar";
import Input from "@/components/common/Input";
import { addCommunitySpb, updateCommunitySpb } from "@/supaBase/api/community";
import { uploadImageSpb } from "@/supaBase/api/myPage";
import { AddScreenNavigationProp } from "@/types/route";
const backIcon = require("@/assets/icons/Back.png");

const Add: React.FC = () => {
  const navigation = useNavigation<AddScreenNavigationProp>();
  const route = useRoute<RouteProp<{params: {id: string}}>>();
  const{communities, userInfo, setCommunities} = useStore();  
  const initObj = route.params?.id && communities.find((el: Community) => el.id === Number(route.params?.id));
  const [form, setForm] = useState<CommunityForm>({
    title: initObj?.title || '',
    contents: initObj?.contents || '',
    images: initObj?.images || [],
  })
  const [loading, setLoading] = useState(false);
  
   // 이미지 선택
   const selectImage = async () => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        maxFiles: 5 - form.images.length,
      });

      const newImages = [...form.images];
      
      res.forEach(el => {
        newImages.push({uri: el.path, type: el.mime, name: String(uuid.v4())});
      });

      setForm({...form, images: newImages});      
    } catch (e) {
      console.error(e);
    }
  };

  const updateCommunity = async(images) => {
    // 게시물 수정
    const res = await updateCommunitySpb(
      form.title,
      form.contents,
      images as string[],
      route.params?.id
    )
    setCommunities(communities.map((el: Community) => el.id === Number(route.params?.id) ? {...el, images} : el));
    if(!res) return
  }

  const addCommunity = async(images) => {
    // 게시물 업로드
    const res = await addCommunitySpb(
      userInfo.user_id,
      form.title,
      form.contents,
      images as string[]
    )
    if(!res) return
  }

  const uploadImage = async () => {
    const notUploadedImages = form.images.filter(el => typeof el !== 'string');
    let images = [...form.images]
    const uploadPromises = notUploadedImages.map(async (el) => {
      const res = await uploadImageSpb(el, false);
      if (res) {
        images = images.map(image => image?.name === el.name ? res : image);
      }
    });
    // 모든 업로드가 완료될 때까지 기다림
    await Promise.all(uploadPromises);
    return images
  };

  const handleSubmit = async () => {
    setLoading(true);
    const images = await uploadImage();
    if(!!initObj?.id) updateCommunity(images)
    else addCommunity(images)
    navigation.navigate("BottomTab", {
      screen: "Community",
      params: { refresh: !!initObj?.id ? false : true },
    });
    setLoading(false);
  };

  // 선택한 이미지 제거
  const removeImg = (item: FormImageFile) => {
    const id = typeof item === 'string' ? item : item?.name;
    setForm((prev: CommunityForm) => {
      const newImages = prev.images.filter(el => {
        if(typeof el === 'string'  && el === id) return false;
        if(typeof el !== 'string' && el.name === id) return false;
        return true
      }); 
      return {...prev, images: newImages};
    });
  };

  // 선택 한 이미지들 미리보기
  const renderImages = (item: FormImageFile) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.deleteImageIconArea}
          onPress={() => removeImg(item)}
        >
          <Icon name="close" size={16} color="#AEB6B9" />
        </TouchableOpacity>
        <View>
          <Image
            source={{uri:typeof item === 'string' ? item :  item?.uri }}
            width={120}
            height={120}
            style={styles.imagePreviewItem}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title={initObj?.id ? "수정하기" : "새 글 쓰기"}
        leftIcon={backIcon}
        leftClick={() => navigation.goBack()}
        rightIcon={<Text style={{color: '#386641', fontSize: 16, fontWeight: '500'}}>등록</Text>}
        rightClick={handleSubmit}
      />
      <Input
        value={form.title}
        setValue={(title) => setForm({...form, title})}
        placeholder="제목을 입력해주세요."
        style={{margin: 12}}
      />
      <Input
        value={form.contents}
        setValue={(contents) => setForm({...form, contents})}
        placeholder="내용을 입력해주세요."
        style={{marginHorizontal: 12}}
        multiline={true}
        numberOfLines={20}
      />

      {/* 이미지 영역 */}
      <View style={styles.photoArea}>
        <FlatList
          data={form.images}
          renderItem={({item}) => renderImages(item)}
          keyExtractor={item => item?.uri || item}
          style={styles.imagePreviewList}
          ListHeaderComponent={
            form.images.length < 5 ?
            <TouchableOpacity
              style={styles.photoAddBox}
              onPress={() => selectImage()}
              disabled={form.images.length > 4}
            >
              <Icon name="camera" size={40} color="#AEB6B9" />
            </TouchableOpacity>
            : <></>
          }
          horizontal
        />
        <Text style={styles.errorMsg}>
          사진은 최대 5장까지 등록 가능합니다.
        </Text>
      </View>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={styles.modalOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  textInput: {
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 10,
    height: 370,
    padding: 12,
    fontSize: 15,
    marginHorizontal: 12
  },
  photoArea: {
    paddingHorizontal: 4,
    marginVertical: 8
  },
  photoAddBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreviewList: {
    marginHorizontal: 8,
  },
  imagePreviewItem: {
    marginLeft: 8,
    borderRadius: 10,
    width: 88,
    height: 88,
  },
  errorMsg: {
    fontFamily: 'GmarketSansTTFMedium',
    margin: 8,
    color: '#333',
  },
  deleteImageIconArea: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  deleteImageIcon: {
    width: 12,
    height: 12,
    margin: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Add;
