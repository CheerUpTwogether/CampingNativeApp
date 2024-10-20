import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../pages/home/Home";
import Articles from "../../pages/articles/Articles";
import Community from "../../pages/community/Community";
import Settings from "../../pages/settings/Settings";
import Splash from "../../pages/Splash";
import CustomBottomTab from "./CustomBottomTab";
import Add from "../../pages/add/Add";
import Login from "@/pages/auth/Login";
import CampingDetail from "@/pages/home/CampingDetail";
import Intro from "@/pages/auth/Intro";
import Profile from "@/pages/auth/Profile";
import { ArticleDetail } from "@/pages/articles/ArticleDetail";

const BottomTabNav = createBottomTabNavigator();
const StackTab = createStackNavigator();

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
      <StackTab.Screen name="Splash" component={Splash} />
      <StackTab.Screen name="Login" component={Login} />
      <StackTab.Screen name="Intro" component={Intro} />
      <StackTab.Screen name="BottomTab" component={BottomTab} />
      <StackTab.Screen name="Add" component={Add} />
      <StackTab.Screen name="CampingDetail" component={CampingDetail} />
      <StackTab.Screen name="ArticleDetail" component={ArticleDetail} />
      <StackTab.Screen name="Profile" component={Profile} />
    </StackTab.Navigator>
  );
};

export default Router;
