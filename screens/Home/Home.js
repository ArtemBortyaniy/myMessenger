import React from "react";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const HeaderTitle = ({ title }) => (
  <View style={{ color: "#212121", marginBottom: 11, fontSize: 17 }}>
    <Text>{title}</Text>
  </View>
);

const HeaderLogOut = () => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{ marginRight: 10, marginBottom: 10 }}
  >
    <Image source={require("../../assets/img/log-out.png")} />
  </TouchableOpacity>
);

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingLeft: 82,
          paddingRight: 81,
        },
        tabBarLabel: "",
        headerStyle: {
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          height: 88,
        },
      }}
    >
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Публікації"} />,
          headerRight: () => <HeaderLogOut />,
          tabBarLabel: "PostsScreen",
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/img/grid.png")} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Створити публікацію"} />,
          tabBarLabel: "CreatePostsScreen",
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/img/new.png")} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Профіль"} />,
          tabBarLabel: "ProfileScreen",
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/img/user.png")} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
