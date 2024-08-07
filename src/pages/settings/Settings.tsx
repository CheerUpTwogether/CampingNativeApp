import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import DetailBox from "@/components/common/DetailBox";
import TopBar from "@/components/common/TopBar";
import Button from "@/components/common/Button";
import { RootStackParamList } from "@/components/router/Router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "@/store/store";

const more = require("@/assets/icons/menu.png");
const profileImage = require("@/assets/images/Introduce1.png");

const alram = require("@/assets/icons/Alram.png");
const etc = require("@/assets/icons/Chat.png");
const question = require("@/assets/icons/Question.png");
const chat = require("@/assets/icons/ChatPhone.png");
const privacy = require("@/assets/icons/Privacy.png");
const appInfo = require("@/assets/icons/Info.png");

const settingIconData = [
  {
    title: "알람",
    description: "마케팅 알람 받아줘...",
    icon: alram,
    page: "SettingDetail",
  },
  {
    title: "자주 묻는 질문",
    description: "마케팅 알람 받아줘...",
    icon: etc,
    page: "TODO 이동할 페이지 명",
  },
];

const settingData = [
  {
    title: "문의하기",
    icon: chat,
    page: "TODO 이동할 페이지 명",
  },
  {
    title: "자주 묻는 질문",
    icon: question,
    page: "TODO 이동할 페이지 명",
  },
  {
    title: "개인 정보 처리 방침",
    icon: privacy,
    page: "TODO 이동할 페이지 명",
  },
  {
    title: "앱 정보",
    icon: appInfo,
    page: "SettingDetail",
  },
];

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Settings = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const userData = useStore().userInfo;

  const handleMove = () => {
    navigation.navigate("ProfileDetail");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      Alert.alert("로그아웃 성공", "로그아웃이 완료되었습니다.", [
        { text: "확인", onPress: () => navigation.replace("Login") },
      ]);
    } catch (error) {
      Alert.alert("오류", "로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TopBar title="설정" leftIcon={more} />
        <View style={styles.userView}>
          <View style={styles.userContainer}>
            <View style={styles.userWrapper}>
              <Text style={styles.title}>프로필 보기</Text>
              <Text style={styles.email}>{userData.email}</Text>
            </View>

            <View style={styles.buttonWrapper}>
              <Button label="View" onPress={handleMove} />
            </View>
          </View>
          <Image
            source={
              userData.profileimagepath
                ? { uri: userData.profileimagepath }
                : profileImage
            }
            style={
              userData.profileimagepath
                ? styles.userProfileImage
                : styles.DummyProfileImage
            }
          />
        </View>

        <View>
          <Text style={styles.subTitle}>일반</Text>
          <View style={{ gap: 8 }}>
            {settingIconData.map((data) => (
              <View key={data.title} style={{ marginBottom: 8 }}>
                <DetailBox
                  title={data.title}
                  description={data.description}
                  icon={data.icon}
                  page={data.page}
                />
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.subTitle}>Support</Text>
          {settingData.map((data) => (
            <View key={data.title} style={{ marginBottom: 8 }}>
              <DetailBox title={data.title} icon={data.icon} page={data.page} />
            </View>
          ))}
        </View>

        <View style={styles.logoutButtonWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={{ color: "#573353" }}>로그아웃</Text>
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
    marginBottom: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  userView: {
    backgroundColor: "#FFF",
    marginHorizontal: "4%",
    borderRadius: 12,
    height: 140,
    flexDirection: "row",
    overflow: "hidden",
  },
  userContainer: {
    marginLeft: 30,
  },
  userWrapper: {
    marginTop: 20,
    gap: 4,
  },
  title: {
    color: "#573353",
    fontWeight: "700",
    fontSize: 18,
  },
  email: {
    color: "rgba(87, 51, 83, 0.5)",
    fontWeight: "500",
    fontSize: 12,
  },
  buttonWrapper: {
    width: 100,
    height: 68,
  },
  DummyProfileImage: {
    width: 200,
    height: 220,
    borderRadius: 40,
    marginRight: 10,
  },
  userProfileImage: {
    width: 160,
    height: 200,
    opacity: 0.8,
    marginLeft: 40,
  },
  subTitle: {
    fontWeight: "500",
    color: "#573353",
    marginLeft: "4%",
    marginTop: 16,
    marginBottom: 20,
  },
  logoutButtonWrapper: {
    alignItems: "center",
    marginHorizontal: "4%",
    marginVertical: 20,
  },
  logoutButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(87, 51, 83, 0.3)",
    borderRadius: 12,
  },
});

export default Settings;
