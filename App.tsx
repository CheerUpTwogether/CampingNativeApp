import React from "react";
import Router from "./src/components/router/Router";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Router />
        <Toast visibilityTime={1000}/>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
