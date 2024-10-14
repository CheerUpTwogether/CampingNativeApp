import React from "react";
import Router from "./src/components/router/Router";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <Toast visibilityTime={1000}/>
    </NavigationContainer>
  );
};

export default App;
