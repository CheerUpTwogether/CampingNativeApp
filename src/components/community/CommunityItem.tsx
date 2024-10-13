import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SettingsScreenNavigationProp } from '../router/Router';
import { useNavigation } from '@react-navigation/native';

const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");
const profileImage = require("@/assets/images/Introduce1.png");

const CommunityItem = ({item}: {item: Community}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const handleMove = (id: number) => {
    navigation.navigate("CommunityDetail", { CommunityId: id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginHorizontal: "4%", marginVertical: "2%" }}
      onPress={() => handleMove(item.id)}
    >
      <View style={styles.userWrapper}>
        <View style={styles.topWrapper}>
          <View style={{ marginVertical: 3 }}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  item.profile
                    ? { uri: item.profile }
                    : profileImage
                }
                style={
                  item.profile
                    ? styles.userProfileImage
                    : styles.dummyProfileImage
                }
              />
            </View>
            <Text style={styles.nickName}>{item.nickname}</Text>
          </View>
          <View style={styles.subjectWrapper}>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
          <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
            <Image source={shareIcon} style={styles.icon1} />
          </TouchableOpacity>
        </View>
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
            <Text style={styles.reactionText}>{item.reply_count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  topWrapper: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  dummyProfileImage: {
    width: 100,
    height: 130,
  },
  userProfileImage: {
    width: 40,
    height: 40,
  },
  subjectWrapper: {
    flex: 1,
    paddingBottom: 30,
    marginLeft: 8,
  },
  subject: {
    color: "#FDA758",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CommunityItem