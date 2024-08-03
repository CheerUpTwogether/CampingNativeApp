import React from "react";
import Router from "./src/components/router/Router";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
