import { Button } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import favFetcher from "@/utils/fetcher/favsFetcher";
import prodFetcher from "@/utils/fetcher/productsFetcher";
import options from "@/utils/fetcher/options";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import styles from "./PopularProducts.module.css";

const PopularProducts = () => {
  const { data: favProducts = [], mutate: mutateFavProducts } = useSWR(
    "favs",
    favFetcher,
    options
  );

  const {
    data: popularProducts = [],
    isValidating: popularProductsLoading,
  } = useSWR("products/popular", prodFetcher, options);

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
                      mutateFavProducts={mutateFavProducts}
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
