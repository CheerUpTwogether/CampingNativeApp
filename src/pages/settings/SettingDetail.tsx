import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import SettingBox from "@/components/common/SettingBox";
import ToggleButton from "@/components/common/ToggleButton";
import { useRoute } from "@react-navigation/native";

const backIcon = require("@/assets/icons/Back.png");

type RootStackParamList = {
  SettingDetail: { title: string };
};

type SettingDetailRouteProp = RouteProp<RootStackParamList, "SettingDetail">;

interface SettingDetailProps {
  route: SettingDetailRouteProp;
}

const SettingDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params as { title: string };

  const handleLeftPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title={title === "알람" ? "알람 설정" : "앱정보"}
        leftIcon={backIcon}
        leftClick={handleLeftPress}
      />
      <View>
        {title === "알람" ? (
          <SettingBox title="푸시 메시지 허용">
            <ToggleButton />
          </SettingBox>
        ) : (
          <SettingBox title="앱 버전">
            <Text>2.0.4231</Text>
          </SettingBox>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SettingDetail;
