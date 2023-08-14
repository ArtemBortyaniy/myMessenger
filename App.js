import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Home from "./screens/Home/Home";
import CommentsScreen from "./screens/CommentsScreen/CommentsScreen";

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();

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
      <MainStack.Screen
        name="Кометарі"
        component={CommentsScreen}
        // options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default App;
