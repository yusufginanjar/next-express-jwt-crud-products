import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { wrapper, store } from "../store";
import { Provider } from "react-redux";

import Navibar from "../components/navibar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navibar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
