import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/components/router/Router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import TopBar from "@/components/common/TopBar";
import { setUserSpb, getUserSpb, setProfileSpb } from "@/supaBase/api/myPage";
import ImagePicker from "react-native-image-crop-picker";
import { base64ToBlob } from "../../utils/imageHelper";

const backIcon = require("@/assets/icons/Back.png");
const ProfileIcon = require("@/assets/icons/Profile.png");

const baseUrl = "http://13.209.27.220:8080";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState<UserEditData>({
    nickname: "",
    email: "",
    introduce: "",
    profileImagePath: "",
  });

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserSpb();
    if (!data) return;
    setUserInfo({
      email: data.email,
      nickname: data.nickname,
      introduce: data.introduce,
      profileImagePath: data.profileImagePath,
    });
  };

  const handlePrev = () => navigation.goBack();

  const patchAccountsData = async () => {
    await setUserSpb(userInfo);
  };

  const handleSave = async () => {
    await patchAccountsData();
    navigation.navigate("ProfileDetail");
  };

  // 이미지 URI를 Blob으로 변환하는 함수
  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const selectImage = async () => {
    try {
      const file = await ImagePicker.openPicker({
        mediaType: "photo",
        multiple: false,
        base64ToBlob,
      });

      // const formData = new FormData();
      // formData.append("image", {
      //   uri: file.path,
      //   type: file.mime,
      //   fileName: `image_${file.path.substring(
      //     file.path.indexOf("picker/") + 7
      //   )}`,
      // });
      console.log(file);
      setProfileSpb(file);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.wrapper}>
        <TopBar
          title="내 정보 수정"
          leftIcon={backIcon}
          leftClick={handlePrev}
        />
        <View style={styles.profileImageWrapper}>
          <Image source={ProfileIcon} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.profileChangeWrapper}
            activeOpacity={0.8}
            onPress={selectImage}
          >
            <Text style={{ color: "#FFF" }}>프로필 변경</Text>
          </TouchableOpacity>
        </View>

        <View>
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
            <Text style={{ color: "#FDA758", fontSize: 8 }}>
              * 닉네임은 12자까지 입력할 수 있습니다.
            </Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.textStyle}>이메일</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#999"
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
              autoCapitalize="none"
              maxLength={12}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.textStyle}>소개</Text>
            <TextInput
              style={[styles.inputStyle, { height: 70 }]}
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
              maxLength={46}
            />
            <Text style={{ color: "#FDA758", fontSize: 8 }}>
              * 소개는 46자까지 입력할 수 있습니다.
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginVertical: 12, marginHorizontal: 24 }}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnStyle, styles.saveButton]}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  profileImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  profileImage: { width: 100, height: 100 },
  profileChangeWrapper: {
    borderRadius: 16,
    backgroundColor: "rgba(87, 51, 83, 0.3)",
    width: 90,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: { marginHorizontal: 24, marginVertical: 8 },
  textStyle: { color: "#573353", marginBottom: 10 },
  inputStyle: {
    height: 40,
    borderColor: "rgba(87, 51, 83, 0.5)",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
    color: "#573353",
    fontWeight: "500",
  },
  buttonWrapper: { alignItems: "center", marginVertical: 20 },
  btnStyle: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 6,
    borderColor: "rgba(87, 51, 83, 0.3)",
    color: "#FFF",
    backgroundColor: "rgba(87, 51, 83, 0.3)",
  },
  saveButton: {
    padding: 12,
    fontWeight: "600",
    width: "100%",
    height: 30,
    textAlign: "center",
    borderRadius: 12,
    paddingTop: 6,
  },
});

export default EditProfile;
