import Carousel, {
  CarouselProps,
  Pagination,
} from "react-native-snap-carousel";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import Button from "@/components/common/Button";
import { TouchableOpacity } from "react-native-gesture-handler";

const Intoduce1 = require("@/assets/images/Introduce1.png");
const Intoduce2 = require("@/assets/images/Introduce2.png");
const Intoduce3 = require("@/assets/images/Introduce3.png");
const Intoduce4 = require("@/assets/images/Introduce4.png");

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface Entry {
  title: string;
  img: ImageSourcePropType;
}

const entries: Entry[] = [
  { title: "Item 1", img: Intoduce1 },
  { title: "Item 2", img: Intoduce2 },
  { title: "Item 3", img: Intoduce3 },
  { title: "Item 4", img: Intoduce4 },
];

const renderItem = ({ item }: { item: Entry; index: number }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={item.img}
        style={{
          width: screenWidth,
          height: screenHeight * 0.75,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const Intro: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const carouselRef = useRef<Carousel<Entry>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.carouselWrapper}>
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index) => setActiveIndex(index)}
          layout={"default"}
        />

        {activeIndex !== 3 ? (
          <View style={styles.navigationGroupWrapper}>
            <View style={{ flexGrow: 1 }}>
              <TouchableOpacity
                style={styles.navigationWrapper}
                onPress={handlePrev}
              >
                <Text style={styles.navigationText}>Skip</Text>
              </TouchableOpacity>
            </View>

            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: "#FFF" }}
              dotStyle={styles.dotStyle}
              inactiveDotStyle={{
                backgroundColor: "#F9B566",
              }}
              inactiveDotScale={0.7}
            />
            <View style={{ flexGrow: 1 }}>
              <TouchableOpacity
                style={styles.navigationWrapper}
                onPress={handleNext}
              >
                <Text style={styles.navigationText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.startButtonWrapper}>
            <Button
              label="시작하기"
              onPress={() => {
                navigation.navigate("Signup");
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  carouselWrapper: {
    marginTop: 30,
    backgroundColor: "#FFF",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: "#573353",
  },
  navigationWrapper: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationGroupWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navigationText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#573353",
  },
  startButtonWrapper: {
    marginHorizontal: 24,
  },
});

export default Intro;
