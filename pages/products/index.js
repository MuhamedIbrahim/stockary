import Head from "next/head";
import AllProducts from "@/components/parts/AllProducts/AllProducts";

const index = () => {
  return (
    <>
      <Head>
        <title>Stockary - Products</title>
      </Head>
      <AllProducts filter filterCats filterCondition />
    </>
  );
};

export default index;
