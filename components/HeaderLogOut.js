import { useNavigation } from "@react-navigation/native";

export const HeaderLogOut = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginRight: 10, marginBottom: 10 }}
      onPress={() => navigation.navigate("Login")}
    >
      <Image source={require("../assets/img/log-out.png")} />
    </TouchableOpacity>
  );
};
