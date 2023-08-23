import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ArrowLeft from "../assets/svg/arrowLeft.svg";

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: 24, height: 24, marginLeft: 16, marginBottom: 10 }}
      onPress={() => navigation.goBack()}
    >
      <ArrowLeft style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
};
