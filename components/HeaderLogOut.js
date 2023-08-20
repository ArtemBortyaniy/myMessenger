import { TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/operations";

export const HeaderLogOut = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginRight: 10, marginBottom: 10 }}
      onPress={() => dispatch(authSignOutUser())}
    >
      <Image source={require("../assets/img/log-out.png")} />
    </TouchableOpacity>
  );
};
