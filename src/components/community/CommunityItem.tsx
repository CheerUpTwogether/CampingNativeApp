import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SettingsScreenNavigationProp } from '../router/Router';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from '@/utils/date';

const CommunityItem = ({item}: {item: Community}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const handleMove = (id: number) => {
    navigation.navigate("CommunityDetail", { CommunityId: id });
  };

  const handleLike = () => {}
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => handleMove(item.id)}
    >
      <View style={styles.profileContainer}>
        {
          item.profile ?
          <Image source={{uri: item.profile}} style={styles.profileImage}/> :
          <Icon name="account-circle" size={44} color="#AEB6B9" style={{marginRight: 4}}/>
        }
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      {
        item?.images?.[0] ? 
        <Image source={{uri: item?.images?.[0]}} style={styles.thumbImage}></Image>:
        <View></View>
      }
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.contents} numberOfLines={2}>{item.contents}</Text>
      <View style={{flexDirection: 'row', marginTop: 8, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleLike}>
            <Icon name={item.is_liked ? 'heart' : 'heart-outline'} size={24} color="#AEB6B9" style={{marginRight: 2}}/>
            <Text>{item.like_count}</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
            <Icon name="comment-outline" size={24} color="#AEB6B9" style={{marginRight: 2, lineHeight: 24}}/>
            <Text>{item.reply_count}</Text>
          </View> 
        </View>
        <Text style={{lineHeight: 24}}>{formatDate(item.create_date).split(' ')[0]}</Text>
      </View>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    margin: 4,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 16
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40, 
    height: 40, 
    marginRight: 8, 
    borderRadius: 100
  },
  nickname: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500"
  },
  thumbImage: {
    width: width - 56,
    height: width - 56,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginVertical: 8
  },
  contentContainer: {},
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  },
  contents: {
    fontSize: 16,
    marginTop: 4
  }
});

export default CommunityItem