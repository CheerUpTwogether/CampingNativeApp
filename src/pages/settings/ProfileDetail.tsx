import TopBar from "@/components/common/TopBar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import DetailBox from "@/components/common/DetailBox";
import { getUserSpb } from "@/supaBase/api/myPage";
import useStore from "@/store/store";

const backIcon = require("@/assets/icons/Back.png");
const profileImage = require("@/assets/images/Introduce1.png");
const favoriteIcon = require("@/assets/icons/Privacy.png");
const timeIcon = require("@/assets/icons/Time.png");
const cardIcon = require("@/assets/icons/Card.png");
const infoIcon = require("@/assets/icons/Info.png");
const settingIcon = require("@/assets/icons/Help.png");

const boxData = [
  {
    title: "프리미엄 전환",
    icon: cardIcon,
    page: "TODO 해당 페이지로 이동",
  },
  {
    title: "캠핑 기록",
    description: "20 Days",
    icon: timeIcon,
    page: "TODO 해당 페이지로 이동",
  },
  {
    title: "그 외 메뉴들!",
    icon: infoIcon,
    page: "TODO 해당 페이지로 이동",
  },
];

const baseUrl = "http://13.209.27.220:8080";

type StackNavProp = StackNavigationProp<RootStackParamList, "EditProfile">;

const ProfileDetail = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigation = useNavigation<StackNavProp>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserSpb();
    if (!data) return;
    setUserData(data);
  };
  const handlePrev = () => {
    navigation.goBack();
  };

  if (!userData) {
    return null;
  }

  const handleMove = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="Profile"
        leftIcon={backIcon}
        leftClick={handlePrev}
        rightIcon={settingIcon}
        rightClick={handleMove}
      />
      <View>
        <View style={styles.introduceContainer}>
          <View style={styles.profileWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  userData.profileimagepath
                    ? { uri: userData.profileimagepath }
                    : profileImage
                }
                style={
                  userData.profileimagepath
                    ? styles.userProfileImage
                    : styles.dummyProfileImage
                }
              />
            </View>
            <View style={styles.introduceWrapper}>
              <View>
                <Text style={styles.name}>{userData.nickname}</Text>
                <Text style={styles.subText}>
                  {userData.introduce
                    ? userData.introduce
                    : "소개를 입력해주세요"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={[styles.contentWrapper, { borderBottomLeftRadius: 12 }]}>
            <View style={styles.contentText}>
              <Text style={styles.subText}>내가 쓴 글</Text>
              <Text style={styles.count}>{userData.communitycount}</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Image source={timeIcon} style={styles.iconStyle} />
            </View>
          </View>
          <View style={{ width: 3, borderColor: "#FFF3E9" }} />
          <View
            style={[styles.contentWrapper, { borderBottomRightRadius: 12 }]}
          >
            <View style={styles.contentText}>
              <Text style={styles.subText}>즐겨 찾기</Text>
              <Text style={styles.count}>{userData.favoritecount}</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Image source={favoriteIcon} style={styles.iconStyle} />
            </View>
          </View>
        </View>
        {boxData.map((box) => (
          <View key={box.title} style={{ marginBottom: 8 }}>
            <DetailBox
              title={box.title}
              icon={box.icon}
              description={box?.description}
              page={box.page}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  profileWrapper: {
    flexDirection: "row",
    marginHorizontal: "4%",
    gap: 14,
  },
  introduceContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: "4%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
  },
  introduceWrapper: {
    gap: 4,
    justifyContent: "center",
  },
  imageWrapper: {
    overflow: "hidden",
    width: 70,
    height: 70,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 12,
  },
  userProfileImage: { width: 80, height: 80, marginVertical: "auto" },
  dummyProfileImage: {
    width: 160,
    height: 190,
  },
  name: {
    fontWeight: "600",
    color: "#573353",
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
    marginHorizontal: "4%",
    marginTop: 3,
    marginBottom: 12,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  contentText: { gap: 4, padding: 16 },
  subText: {
    color: "rgba(87, 51, 83, 0.5)",
    fontSize: 12,
    fontWeight: "500",
  },
  iconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(253, 167, 88, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  count: {
    color: "#573353",
    fontWeight: "500",
    fontSize: 16,
  },
  editText: { color: "#999", fontSize: 10 },
});

export default ProfileDetail;
