//navigation
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

//bottom tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//components
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen";
import PostsScreen from "./screens/mainScreens/PostsScreen";
import ProfileScreen from "./screens/mainScreens/ProfileScreen";

//Bottom Tabs components
import { GoBack } from "./components/GoBack";
import { HeaderLogOut } from "./components/HeaderLogOut";
import { HeaderTitle } from "./components/HeaderTitle";

//NestedScreens
import CommentsScreen from "./screens/nestedScreens/CommentsScreen";
import MapScreen from "./screens/nestedScreens/MapScreen";

//svg
import PostsLink from "./assets/svg/postsLink.svg";
import New from "./assets/svg/new.svg";
import User from "./assets/svg/user.svg";

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function useRoutes(isAuth) {
  if (!isAuth) {
    return (
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
      </MainStack.Navigator>
    );
  }

  return <Home />;
}

//Bottom Tabs
const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Map" component={MapScreen} />
      <HomeStack.Screen name="Comments" component={CommentsScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigation = () => (
  <Tab.Navigator
    initialRouteName="PostsScreen"
    screenOptions={{
      tabBarActiveTintColor: "#e91e63",
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        height: 83,
        paddingTop: 29,
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
        tabBarIcon: ({ color, size }) => <PostsLink />,
        tabBarLabel: "",
      }}
    />
    <Tab.Screen
      name="Create post"
      component={CreatePostsScreen}
      options={{
        headerTitle: () => <HeaderTitle title={"Create post"} />,
        headerLeft: () => <GoBack />,
        tabBarIcon: ({ color, size }) => <New />,
        tabBarLabel: "",
        tabBarStyle: { display: "none" },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitle: () => <HeaderTitle title={"Profile"} />,
        tabBarIcon: ({ color, size }) => <User />,
        tabBarLabel: "",
      }}
    />
  </Tab.Navigator>
);
