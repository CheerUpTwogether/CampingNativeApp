import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../pages/home/Home";
import Articles from "../../pages/articles/Articles";
import Community from "../../pages/community/Community";
import Settings from "../../pages/settings/Settings";
import SettingDetail from "@/pages/settings/SettingDetail";
import Splash from "../../pages/Splash";
import CustomBottomTab from "./CustomBottomTab";
import Add from "../../pages/add/Add";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import CampingDetail from "@/pages/home/CampingDetail";
import ProfileDetail from "@/pages/settings/ProfileDetail";

const BottomTabNav = createBottomTabNavigator();
const StackTab = createStackNavigator();

export type RootBottomParamList = {
  Home: undefined;
  Articles: undefined;
  Community: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Splash: undefined;
  BottomTab: undefined;
  Add: undefined;
  Camping: undefined;
  SettingDetail: undefined;
  ProfileDetail: undefined;
};

const renderTabBar = (props: BottomTabBarProps) => (
  <CustomBottomTab {...props} />
);

const BottomTab = () => {
  return (
    <BottomTabNav.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderTabBar}
    >
      <BottomTabNav.Screen name="Home" component={Home} />
      <BottomTabNav.Screen name="Articles" component={Articles} />
      <BottomTabNav.Screen name="Community" component={Community} />
      <BottomTabNav.Screen name="Settings" component={Settings} />
    </BottomTabNav.Navigator>
  );
};

const Router = () => {
  return (
    <StackTab.Navigator screenOptions={{ headerShown: false }}>
      {/* <StackTab.Screen name="Splash" component={Splash} />
      <StackTab.Screen name="Login" component={Login} />
      <StackTab.Screen name="Signup" component={Signup} /> */}
      <StackTab.Screen name="BottomTab" component={BottomTab} />
      <StackTab.Screen name="Add" component={Add} />
      <StackTab.Screen name="Camping" component={CampingDetail} />
      <StackTab.Screen name="SettingDetail" component={SettingDetail} />
      <StackTab.Screen name="ProfileDetail" component={ProfileDetail} />
    </StackTab.Navigator>
  );
};

export default Router;
