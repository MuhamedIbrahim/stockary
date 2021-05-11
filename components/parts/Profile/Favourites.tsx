import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import { selectAllFavs } from "@/utils/redux/slices/favSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductsContainer } from "./ProfileContent";

const Favourites = () => {
  const { favs: favProducts = [], isLoading } = useSelector(selectAllFavs);

  const dispatch = useDispatch();

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
            dispatch={dispatch}
            rowStyle={true}
          />
        ))
      )}
    </ProductsContainer>
  );
};

export default Favourites;
