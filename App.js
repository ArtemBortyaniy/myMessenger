import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Home from "./screens/Home/Home";
import CommentsScreen from "./screens/CommentsScreen/CommentsScreen";
import MapScreen from "./screens/MapScreen/MapScreen";

const MainStack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name="Кометарі" component={CommentsScreen} />
      <MainStack.Screen name="Карта" component={MapScreen} />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default App;
