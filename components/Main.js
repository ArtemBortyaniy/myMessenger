import React, { useEffect } from "react";

//stateChangedUser
import { useDispatch, useSelector } from "react-redux";
import { stateChangedUser } from "../redux/auth/operations";

//NavigationContainer
import { NavigationContainer } from "@react-navigation/native";

//HOOK routers
import useRoutes from "../router";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stateChangedUser());
  }, []);

  const isLogined = useRoutes(stateChange);

  return <NavigationContainer>{isLogined}</NavigationContainer>;
};

export default Main;
