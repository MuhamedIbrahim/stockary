import Head from "next/head";
import FeaturedProds from "@/components/parts/FeaturedProds/FeaturedProds";
import PopularCats from "@/components/parts/PopularCats/PopularCats";
import ProductAd from "@/components/parts/ProductAd/ProductAd";
import PopularProducts from "@/components/parts/PopularProducts/PopularProducts";
import { colors } from "@/styles/theme";

const index = () => {
  return (
    <>
      <Head>
        <title>Stockary</title>
      </Head>
      <FeaturedProds />
      <PopularCats />
      <ProductAd rowStyle adID="7gT6udQwj1CKO9lxS9bK63" />
      <PopularProducts />
      <ProductAd
        adID="2UeM7V2NVADIkwqpHViFzc"
        bgColor={colors.cyan[70]}
        badgeBgColor={colors.cyan[80]}
        badgeColor={colors.cyan[100]}
      />
    </>
  );
};

export default index;
