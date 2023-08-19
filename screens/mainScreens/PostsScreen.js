import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import DefaultScreen from "../nestedScreens/DefaultScreen";

const NestedScreens = createStackNavigator();

const PostsScreen = () => (
  <NestedScreens.Navigator initialRouteName="DefaultScreen">
    <NestedScreens.Screen
      name="DefaultScreen"
      component={DefaultScreen}
      options={{ headerShown: false }}
    />
    <NestedScreens.Screen name="Map" component={MapScreen} />
    <NestedScreens.Screen name="Comments" component={CommentsScreen} />
  </NestedScreens.Navigator>
);

export default PostsScreen;
