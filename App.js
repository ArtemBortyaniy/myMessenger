import React from "react";

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
      </PersistGate>
    </Provider>
  );
};

export default App;
