import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

// 피드 정렬을 위한 row 세팅
const renderRow = (rowData, rowIndex, navigation) => (
  <View key={rowIndex} style={styles.row}>
    {rowData.map(item => (
      <View key={item.id} style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feed', {id: item.id})}
        >
          {item?.images?.[0] ? (
            <Image
              source={{uri: item.images[0]}}
              style={styles.image}
            />
          ) : (
            <View style={[styles.image, styles.icon]}>
              <Icon name="image-remove" size={60} color="#aaa"/>
            </View>
          )}

          
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const FeedGallery = ({feedList}) => {
  const navigation = useNavigation();
  // 피드 정렬을 위한 column 세팅
  const groupPhotosInRows = photos => {
    const rows = [];
    for (let i = 0; i < photos.length; i += numColumns) {
      rows.push(photos.slice(i, i + numColumns));
    }
    return rows;
  };

  const rows = groupPhotosInRows(feedList);

  return (
    <View style={styles.feedListContainer}>
      {rows.map((item, idx) => {
        return renderRow(item, idx, navigation);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  feedListContainer: {
    marginTop: 16,
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FeedGallery;