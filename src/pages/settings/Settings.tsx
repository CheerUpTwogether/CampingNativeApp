import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import DetailBox from "@/components/common/DetailBox";
import TopBar from "@/components/common/TopBar";
import Button from "@/components/common/Button";

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
    page: "TODO 이동할 페이지 명",
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
    page: "TODO 이동할 페이지 명",
  },
];

const Settings = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* TODO - leftClick 전달(이동할 페이지) */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TopBar title="Settings" leftIcon={more} />
        <View style={styles.userView}>
          <View style={styles.userContainer}>
            <View style={styles.userWrapper}>
              <Text style={styles.title}>프로필 보기</Text>
              <Text style={styles.email}>dummyTest@gmail.com</Text>
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                label="View"
                onPress={() => console.log("TODO: 마이페이지 이동")}
              />
            </View>
          </View>
          <Image source={profileImage} style={styles.profileImage} />
        </View>

        <View>
          <Text style={styles.subTitle}>일반</Text>
          <View style={{ gap: 8 }}>
            {settingIconData.map((data) => (
              <View id={data.title} style={{ marginBottom: 8 }}>
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
            <View id={data.title} style={{ marginBottom: 8 }}>
              <DetailBox title={data.title} icon={data.icon} page={data.page} />
            </View>
          ))}
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
    justifyContent: "flex-start",
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
    width: 120,
    height: 40,
  },
  profileImage: {
    width: 200,
    height: 220,
    borderRadius: 40,
    marginRight: 10,
  },
  subTitle: {
    fontWeight: "500",
    color: "#573353",
    marginLeft: "4%",
    marginTop: 16,
    marginBottom: 20,
  },
});

export default Settings;
