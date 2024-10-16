import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Session } from "@supabase/supabase-js";

export type RootBottomParamList = {
  Home: undefined;
  Articles: undefined;
  Community: undefined | string;
  Settings: undefined | string;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Splash: undefined;
  BottomTab: {
    screen: keyof RootBottomParamList;
  };
  Add: {
    id: number;
  };
  CampingDetail: { campingInfo: CampingType };
  SettingDetail: undefined;
  ProfileDetail: undefined;
  Intro: undefined;
  ArticleDetail: { id: number };
  Community: { refresh: boolean };
  EditProfile: undefined;
  // Profile: {init: boolean}
  Profile: { authData: { user?: User; session: Session } };
};
// `route` 객체의 타입을 정의
type CommunityScreenRouteProp = RouteProp<RootStackParamList, "Community">;

export interface CommunityProps {
  route: CommunityScreenRouteProp;
}

export type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type AddScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Add"
>;
