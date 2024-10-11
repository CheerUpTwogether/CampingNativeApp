import * as React from "react";
import Button from "@/components/common/Button";
import {  Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/components/router/Router";

const Intoduce1 = require("@/assets/images/Introduce1.png");
const Intoduce2 = require("@/assets/images/Introduce2.png");
const Intoduce3 = require("@/assets/images/Introduce3.png");
const Intoduce4 = require("@/assets/images/Introduce4.png");

const {width, height} = Dimensions.get("window");
 
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

function Intro() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const count = 0 
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = ({ item }: { item: Entry; index: number }) => {
    return (
      <View>
        <Image
          source={item.img}
          style={{
            width: width,
            height: height * 0.75,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };
 
  return (
    <View style={{ flex: 1, marginVertical: 20 }}>
      <Carousel
        ref={ref}
        width={width}
        height={height - 200}
        data={entries}
        onProgressChange={progress}
        renderItem={renderItem}
        loop={false}
        
      />
      {progress.value !== 3 ? (
        <View style={styles.navigationGroupWrapper}>
          <TouchableOpacity
            style={styles.navigationWrapper}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.navigationText}>Skip</Text>
          </TouchableOpacity>
          <Pagination.Basic
            progress={progress}
            data={entries}
            dotStyle={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 100 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
          <TouchableOpacity
            style={styles.navigationWrapper}
            onPress={() => ref.current?.next()}
          >
            <Text style={styles.navigationText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.startButtonWrapper}>
          <Button
            label="시작하기" 
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
      )}
     
    </View>
  );
}
 
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
    padding: 24,
    margin: 24,
  },
});
export default Intro;