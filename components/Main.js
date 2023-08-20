import React, { useEffect } from "react";

//stateChangedUser
import { useDispatch, useSelector } from "react-redux";
import { stateChangedUser } from "../redux/auth/operations";

//NavigationContainer
import { NavigationContainer } from "@react-navigation/native";

//HOOK routers
import useRoute from "../router";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stateChangedUser());
  }, []);

  const isLogined = useRoute(stateChange);
  useEffect(() => {}, []);

  return <NavigationContainer>{isLogined}</NavigationContainer>;
};

export default Main;
