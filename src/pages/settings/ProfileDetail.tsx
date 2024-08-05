import TopBar from "@/components/common/TopBar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DetailBox from "@/components/common/DetailBox";
import { getUserApi } from "@/apis/myPage";

const backIcon = require("@/assets/icons/Back.png");
const profileImage = require("@/assets/images/Introduce1.png");
const favoriteIcon = require("@/assets/icons/Privacy.png");
const timeIcon = require("@/assets/icons/Time.png");
const cardIcon = require("@/assets/icons/Card.png");
const infoIcon = require("@/assets/icons/Info.png");

interface UserData {
  nickName: string;
  email: string;
  introduce: string;
  profileImagePath: string;
  communityCount: number;
  favoriteCount: number;
}

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

const ProfileDetail = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigation = useNavigation();

  const baseUrl = "http://13.209.27.220:8080";

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserApi();
      setUserData(res.result);
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    navigation.goBack();
  };

  if (!userData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="Profile" leftIcon={backIcon} leftClick={handlePrev} />
      <View>
        <View style={styles.introduceContainer}>
          <View style={styles.profileWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  userData.profileImagePath
                    ? { uri: userData.profileImagePath }
                    : profileImage
                }
                style={styles.profileImage}
              />
            </View>
            <View style={styles.introduceWrapper}>
              <Text style={styles.name}>{userData.nickName}</Text>
              <Text style={styles.subText}>
                {userData.introduce
                  ? baseUrl + userData.introduce
                  : "소개를 입력해주세요"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={[styles.contentWrapper, { borderBottomLeftRadius: 12 }]}>
            <View style={styles.contentText}>
              <Text style={styles.subText}>내가 쓴 글</Text>
              <Text style={styles.count}>{userData.communityCount}</Text>
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
              <Text style={styles.count}>{userData.favoriteCount}</Text>
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
    marginBottom: 12,
  },
  profileImage: {
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
});

export default ProfileDetail;
