import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from "react-native-image-crop-picker";
import { addProfileSpb, updateProfileSpb, uploadImageSpb } from '@/supaBase/api/myPage';
import Toast from 'react-native-toast-message';
import useStore from "@/store/store";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SettingsScreenNavigationProp } from '@/types/route';

const Profile = () => {
  const setUserData = useStore((state) => state.setUserData);
  const route = useRoute<RouteProp<{params: {init: boolean}}>>();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {userInfo: initialUserInfo} = useStore();
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    introduce: "",
    profile: '',
  });
  const [profileImage, setProfileImage] = useState<CropPickerImage>({
    uri: '',
    type: '',
    name: '',
  })


  const selectImage = async () => {
    try {
      const file = await ImagePicker.openPicker({
        mediaType: "photo",
        multiple: false,
      });

      if(!file) return;

      const image = {
        uri: file.path,
        type: file.mime,
        name: `${file.modificationDate}${file.path.slice(-4)}`,
      };
      setProfileImage(image)
      setUserInfo((prev) => ({ ...prev, profile: file.path }));
      
    } catch (e) {}
  };

  // 프로필 추가
  const addProfile = async (user: {
    nickname: string;
    introduce: string;
    profile: string;
  }) => {
    const {error} = await addProfileSpb(user)
    if(error) {
      throw new Error(error.message);
    }

    Toast.show({
      type: "success",
      text1: `${userInfo.nickname} 님 환영합니다 🎉`, // userInfo에서 직접 가져오기
    });

    setUserData(userInfo);
    
    navigation.replace("BottomTab", {"screen": 'Home'})
  }

  // 프로필 수정
  const updateProfile = async (user: {
    nickname: string;
    introduce: string;
    profile: string;
  }) => {
    const {error} = await updateProfileSpb({...user, user_id: initialUserInfo.user_id})
    if(error) {
      throw new Error(error.message);
    }

    Toast.show({
      type: "success",
      text1: `${userInfo.nickname}님의 정보를 수정했어요`, // userInfo에서 직접 가져오기
    });

    setUserData(userInfo);
    
    navigation.replace("BottomTab", {"screen": 'Home'})
  }

  const setProfile = async () => {
    try{
      const user = {...userInfo}
      if(userInfo.profile) {
        const profile = await uploadImageSpb(profileImage, true);
        if(!profile) throw new Error('프로필 이미지 업로드 실패');
        user.profile = profile;
      }  
      
      console.log(route.params?.init)
      if(route.params?.init) addProfile(user)
      else updateProfile(user)
    } catch(e) {
      Toast.show({
        type: "error",
        text1: '오류가 발생했어요', // userInfo에서 직접 가져오기
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.profileImageWrapper}>
            {userInfo.profile ?
              <Image source={{ uri: userInfo.profile }} style={styles.profileImage}/>
              :(
                <TouchableOpacity style={styles.noProfileWapper} onPress={selectImage}>
                  <Icon name="account-circle" size={180} color="#AEB6B9" />
                  <View style={styles.noProfileContainer}>
                    <Icon name="camera" size={24} color="#AEB6B9"  />
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{marginTop: 24}}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textStyle}>닉네임</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor="#999"
                value={userInfo.nickname}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, nickname: text })
                }
                autoCapitalize="none"
                maxLength={12}
              />
              <Text style={{ color: "#386641", fontSize: 12, marginBottom: 8 }}>
                * 닉네임은 12자까지 입력할 수 있습니다.
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.textStyle}>소개</Text>
              <TextInput
                style={[styles.inputStyle, { height: 100 }]}
                placeholder="나를 소개해주세요."
                placeholderTextColor="#999"
                autoCorrect={false}
                autoCapitalize="none"
                value={userInfo.introduce}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, introduce: text })
                }
                multiline={true}
                numberOfLines={3}
                maxLength={100}
              />
              <Text style={{ color: "#386641", fontSize: 12 }}>
                * 소개는 100자까지 입력할 수 있습니다.
              </Text>
            </View>

            <TouchableOpacity
              style={{ marginVertical: 12, marginHorizontal: 24 }}
              onPress={setProfile}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButton}>저장하기</Text>
            </TouchableOpacity>
          </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  noProfileWapper: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: "center",
  },
  noProfileContainer: {
    position: 'absolute', 
    right: 12, 
    bottom: 12, 
    backgroundColor: '#fff', 
    padding: 8, 
    borderRadius: 100, 
    borderColor: "#ddd", 
    borderWidth: 1
  },
  profileImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  profileImage: { 
    width: 160, 
    height: 160, 
    borderRadius: 100 
  },
  profileChangeWrapper: {
    borderRadius: 20,
    backgroundColor: "#a7c957",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: { marginHorizontal: 24, marginVertical: 8 },
  textStyle: { 
    color: "#333", 
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 16
  },
  inputStyle: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
    borderRadius: 8,
    color: "#555",
    fontWeight: "500",
    textAlignVertical: 'top'
  },
  buttonWrapper: { 
    alignItems: "center", 
    marginVertical: 20 
  },
  saveButton: {
    fontWeight: "600",
    fontSize: 16,
    width: "100%",
    height: 48,
    textAlign: "center",
    justifyContent: 'center',
    borderRadius: 12,    
    borderColor: "#6a994e",
    color: "#FFF",
    backgroundColor: "#6a994e",
    textAlignVertical: 'center'
  },
});


export default Profile