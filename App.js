import React from "react";
//notification
import Toast from "react-native-toast-message";

//store
import { Provider } from "react-redux";
import { store } from "./redux/store";

//persistor
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

//component
import Main from "./components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
