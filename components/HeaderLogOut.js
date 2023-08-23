import { TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/operations";
import { LogOut } from "../assets/svg/logOut.svg";

export const HeaderLogOut = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginRight: 10, marginBottom: 10 }}
      onPress={() => dispatch(authSignOutUser())}
    >
      {/* <LogOut style={{ with: 24, height: 24 }} /> */}
    </TouchableOpacity>
  );
};
