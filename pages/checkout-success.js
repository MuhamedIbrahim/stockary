import Head from "next/head";
import CheckoutSuccess from "@/components/parts/Checkout/CheckoutSuccess";

const checkoutSuccess = () => {
  return (
    <>
      <Head>
        <title>Stockary - Thank you for your purchasing</title>
      </Head>
      <CheckoutSuccess />
    </>
  );
};

export default checkoutSuccess;
