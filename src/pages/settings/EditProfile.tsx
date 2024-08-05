import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/components/router/Router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { setProfileApi, setUserApi, getUserApi } from "@/apis/myPage";
import TopBar from "@/components/common/TopBar";

const backIcon = require("@/assets/icons/Back.png");
const ProfileIcon = require("@/assets/icons/Profile.png");

const baseUrl = "http://13.209.27.220:8080";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState<UserEditData>({
    nickname: { value: "" },
    introduce: "",
    profileImagePath: "",
  });
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserApi();
      if (!res) return;
      setUserInfo({
        nickname: { value: res.result.nickName },
        introduce: res.result.introduce,
        profileImagePath: res.result.profileImagePath,
      });
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    navigation.goBack();
  };

  const patchAccountsData = async () => {
    const data: Partial<User> = {
      nickname: userInfo.nickname.value,
      introduce: userInfo.introduce,
      profileImagePath: userInfo.profileImagePath,
    };

    await setUserApi(data);
  };

  const handleSave = async () => {
    await patchAccountsData();
    navigation.navigate("ProfileDetail");
  };

  return (
    <ScrollView style={styles.wrapper}>
      <TopBar title="내 정보 수정" leftIcon={backIcon} leftClick={handlePrev} />
      <View style={styles.profileImageWrapper}>
        <Image source={ProfileIcon} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.profileChangeWrapper}
          activeOpacity={0.8}
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
            value={userInfo.nickname.value}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, nickname: { value: text } })
            }
            autoCapitalize="none"
            maxLength={12}
          />
          <Text style={{ color: "#FDA758", fontSize: 8 }}>
            * 닉네임은 12자까지 입력할 수 있습니다.
          </Text>
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
        >
          <Text style={[styles.btnStyle, styles.saveButton]}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
