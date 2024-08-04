import Carousel, {
  CarouselProps,
  Pagination,
} from "react-native-snap-carousel";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const { width: screenWidth } = Dimensions.get("window");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface Entry {
  title: string;
}

const entries: Entry[] = [
  { title: "Item 1" },
  { title: "Item 2" },
  { title: "Item 3" },
  { title: "Item 4" },
];

const renderItem = ({ item }: { item: Entry; index: number }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{item.title}</Text>
    </View>
  );
};

const Intro: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.75}
        layout={"default"}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeIndex}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "white",
        }}
        inactiveDotStyle={{
          backgroundColor: "gray",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  itemContainer: {
    backgroundColor: "lightblue",
    borderRadius: 8,
    height: 150,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  itemLabel: {
    color: "black",
    fontSize: 24,
  },
});

export default Intro;
