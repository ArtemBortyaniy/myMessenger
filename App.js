import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
//navigation
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
//bottom tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//store
import { Provider } from "react-redux";
import { store } from "./redux/store";
//persistor
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

//components
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CommentsScreen from "./screens/CommentsScreen/CommentsScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import CreatePostsScreen from "./screens/CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "./screens/PostsScreen/PostsScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
          <MainStack.Screen name="Comments" component={CommentsScreen} />
          <MainStack.Screen name="Map" component={MapScreen} />
          <MainStack.Screen name="Posts" component={PostsScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;

//Bottom Tabs

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
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Posts"} />,
          headerRight: () => <HeaderLogOut />,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/img/grid.png")} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Create post"} />,
          headerLeft: () => <GoBack />,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/img/new.png")} />
          ),
          tabBarLabel: "",
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => <HeaderTitle title={"Profile"} />,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/img/user.png")} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}

//components header Bottom Tabs

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: 24, height: 24, marginLeft: 16, marginBottom: 10 }}
      onPress={() => navigation.goBack()}
    >
      <Image source={require("./assets/img/arrow-left.png")} />
    </TouchableOpacity>
  );
};

export const HeaderTitle = ({ title }) => (
  <View
    style={{
      marginBottom: 11,
    }}
  >
    <Text
      style={{
        color: "#212121",
        fontSize: 17,
        fontWeight: "700",
      }}
    >
      {title}
    </Text>
  </View>
);

export const HeaderLogOut = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginRight: 10, marginBottom: 10 }}
      onPress={() => navigation.navigate("Login")}
    >
      <Image source={require("./assets/img/log-out.png")} />
    </TouchableOpacity>
  );
};
