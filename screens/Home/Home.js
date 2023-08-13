import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

// const Home = () => {

//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="CreatePostsScreen"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarLabel: "CreatePostsScreen",
          tabBarIcon: ({ color, size }) => <Text>3</Text>,
        }}
      />
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarLabel: "PostsScreen",
          tabBarIcon: ({ color, size }) => <Text>3</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "ProfileScreen",
          tabBarIcon: ({ color, size }) => (
            <Text>3</Text>
            // <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
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
