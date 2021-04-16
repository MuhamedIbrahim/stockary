import "@/styles/globals.css";
import { ProvideAuth } from "@/utils/useAuth";
import Header from "@/components/parts/Header/Header";
import Footer from "@/components/parts/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ProvideAuth>
  );
}

export default MyApp;
