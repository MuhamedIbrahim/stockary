import { Button } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import prodFetcher from "@/utils/fetcher/productsFetcher";
import options from "@/utils/fetcher/options";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import styles from "./PopularProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllFavs } from "@/utils/redux/slices/favSlice";

const PopularProducts = () => {
  const { favs: favProducts = [] } = useSelector(selectAllFavs);

  const dispatch = useDispatch();

  const { data: popularProducts = [], isValidating: popularProductsLoading } =
    useSWR("products/popular", prodFetcher, options);

  return (
    <>
      {popularProducts.length === 0 && !popularProductsLoading ? null : (
        <div className="st_main_section">
          <div className="container">
            <h2
              className="st_main_section__title"
              style={{ textAlign: "center" }}
            >
              Popular Items
            </h2>
            {popularProductsLoading ? (
              <Skeleton
                number={20}
                width="100%"
                height="800px"
                bgColor={colors.black[80]}
                marginTop="40px"
                fullwidth
              />
            ) : (
              <>
                <div className={styles.popular_products__all_products}>
                  {popularProducts?.map((prod) => (
                    <SingleProduct
                      key={prod.id}
                      product={prod}
                      favs={favProducts}
                      dispatch={dispatch}
                    />
                  ))}
                </div>
                <div className={styles.popular_products__cta}>
                  <Button
                    name="More Products"
                    size="lg"
                    bgColor={colors.blue[100]}
                    color={colors.white[100]}
                    link
                    href="/products"
                  >
                    See More
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularProducts;
