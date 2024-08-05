import React, { useState, useEffect } from "react";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import TopBar from "@/components/common/TopBar";
import { getCommunitysApi } from "@/apis/community";

const leftIcon = require("@/assets/icons/menu.png");
const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");
const profileImage = require("@/assets/images/Introduce1.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Community = () => {
  const [dataList, setDataList] = useState<Community[]>([]);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const fetchData = async () => {
    const res = await getCommunitysApi();
    if (res?.data?.result?.content) {
      const sortedData = res.data.result.content.sort(
        (a: Community, b: Community) => b.id - a.id
      );
      setDataList(sortedData);
    }
    setRefresh(false);
  };

  useEffect(() => {
    fetchData();
  }, [refresh, dataList]);

  const handleMove = (id: number) => {
    navigation.navigate("CommunityDetail", { CommunityId: id });
  };

  const pullDown = () => {
    setRefresh(true);
  };

  const renderItem: ListRenderItem<Community> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginHorizontal: "4%", marginVertical: "2%" }}
      onPress={() => handleMove(item.id)}
    >
      <View style={styles.userWrapper}>
        <View style={styles.topWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={styles.profileImage} source={profileImage} />
          </View>
          <Text style={styles.nickName}>{item.nickname}</Text>
        </View>
        <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
          <Image source={shareIcon} style={styles.icon1} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.contentText}>{item.content}</Text>
        <View style={styles.reactionContainer}>
          <View style={styles.reactionWrapper}>
            <Image style={styles.icon1} source={heartIcon} />
            <Text style={styles.reactionText}>{item.like}</Text>
          </View>
          <View style={styles.reaction}>
            <Image style={styles.icon2} source={chatIcon} />
            <Text style={styles.reactionText}>{item.replyCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="커뮤니티" leftIcon={leftIcon} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullDown()} />
        }
      >
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
    marginBottom: 100,
  },
  topWrapper: {
    flexDirection: "row",
    gap: 4,
    margin: 12,
  },
  userWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  icon1: {
    width: 15,
    height: 12,
  },
  icon2: {
    width: 15,
    height: 15,
  },

  nickName: {
    color: "#573353",
    fontWeight: "500",
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    height: 80,
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentText: {
    color: "#573353",
  },
  reactionContainer: {
    flexDirection: "row",
    gap: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  reactionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  reactionText: {
    fontSize: 12,
  },
  imageWrapper: {
    overflow: "hidden",
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 130,
  },
});

export default Community;
