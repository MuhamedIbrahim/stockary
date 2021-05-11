import "@/styles/globals.css";
import { ProvideAuth } from "@/utils/useAuth";
import Header from "@/components/parts/Header/Header";
import Footer from "@/components/parts/Footer/Footer";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </ProvideAuth>
  );
}

export default MyApp;
