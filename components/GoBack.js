import { useNavigation } from "@react-navigation/native";

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: 24, height: 24, marginLeft: 16, marginBottom: 10 }}
      onPress={() => navigation.goBack()}
    >
      <Image source={require("../assets/img/arrow-left.png")} />
    </TouchableOpacity>
  );
};
