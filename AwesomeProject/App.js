import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Home from "./screens/Home/Home";
import CommentsScreen from "./screens/CommentsScreen/CommentsScreen";
import CreatePostsScreen from "./screens/CreatePostsScreen/CreatePostsScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const MainStack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        // options={{
        //   title: "Registration screen",
        //   headerStyle: {
        //     backgroundColor: "#f4511e",
        //   },
        //   headerTintColor: "#fff",
        //   headerTitleStyle: {
        //     fontWeight: "bold",
        //     fontSize: 20,
        //   },
        //   headerRight: () => (
        //     <Button
        //       onPress={() => alert("This is a button!")}
        //       title="Press me"
        //       color="#fff"
        //     />
        //   ),
        // }}
      />
      <MainStack.Screen name="Login" component={LoginScreen} />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default App;
