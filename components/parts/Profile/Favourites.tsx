import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import fetcher from "@/utils/fetcher/favsFetcher";
import options from "@/utils/fetcher/options";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductsContainer } from "./ProfileContent";

const Favourites = () => {
  const {
    data: favProducts = [],
    mutate: mutateFavProducts,
    isValidating: isLoading,
  } = useSWR("favs", fetcher, options);

  return (
    <ProductsContainer>
      {isLoading ? (
        <Skeleton
          number={10}
          height="500px"
          width="100%"
          fullwidth
          bgColor={colors.black[80]}
        />
      ) : favProducts.length === 0 ? (
        <p>Your favourites is empty.</p>
      ) : (
        favProducts.map((prod) => (
          <SingleProduct
            key={prod.productID}
            product={{
              ...prod,
              id: prod.productID,
              images: [prod.image],
            }}
            favs={favProducts}
            mutateFavProducts={mutateFavProducts}
            rowStyle={true}
          />
        ))
      )}
    </ProductsContainer>
  );
};

export default Favourites;
