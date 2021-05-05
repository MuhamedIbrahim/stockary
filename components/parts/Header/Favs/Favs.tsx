import { IconButton } from "@/components/UI/Button/Button";
import { Arrow, Heart, HeartFilled } from "@/styles/icons";
import { colors } from "@/styles/theme";
import styles from "./Favs.module.css";
import Product from "./Product/Product";
import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import fetcher, {
  onUpdateFavProductsHandler,
} from "@/utils/fetcher/favsFetcher";
import options from "@/utils/fetcher/options";

const Favs = () => {
  const favMenuRef = useRef(null);

  const { data: favProducts = [], mutate: mutateFavProducts } = useSWR(
    "favs",
    fetcher,
    options
  );

  const toggleFavMenuHandler = useCallback(() => {
    favMenuRef?.current?.classList.contains(styles["header_favs__menu--active"])
      ? favMenuRef.current.classList.remove(styles["header_favs__menu--active"])
      : favMenuRef.current.classList.add(styles["header_favs__menu--active"]);
  }, []);

  const closeFavMenuHandler = useCallback((e) => {
    if (!e.target.closest("#header_favs")) {
      favMenuRef?.current?.classList.contains(
        styles["header_favs__menu--active"]
      ) &&
        favMenuRef.current.classList.remove(
          styles["header_favs__menu--active"]
        );
    }
  }, []);

  const onRemoveProductHandler = useCallback((id) => {
    onUpdateFavProductsHandler({ id }, "remove", id);
    mutateFavProducts();
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeFavMenuHandler);
    return () => {
      document.removeEventListener("click", closeFavMenuHandler);
    };
  }, []);

  return (
    <div className={styles.header_favs} id="header_favs">
      <div className={styles.header_favs__icon}>
        <IconButton
          size="lg"
          bgColor={colors.white[90]}
          borderColor="transparent"
          name="Favourites"
          onClick={toggleFavMenuHandler}
        >
          {favProducts.length > 0 ? (
            <HeartFilled width="20" height="20" fill={colors.white[100]} />
          ) : (
            <Heart width="20" height="20" fill={colors.white[100]} />
          )}
        </IconButton>
        {favProducts.length > 0 && (
          <span
            style={{ backgroundColor: colors.red[90] }}
            className={styles.header_favs__icon_point}
          ></span>
        )}
      </div>
      <div
        ref={favMenuRef}
        style={{ backgroundColor: colors.white[100] }}
        className={styles.header_favs__menu}
      >
        {favProducts.length === 0 ? (
          <p
            className={styles.header_favs__menu_empty}
            style={{ color: colors.black[60] }}
          >
            You don't have favourite products.
          </p>
        ) : (
          <>
            <p
              className={styles.header_favs__menu_title}
              style={{ color: colors.black[100] }}
            >
              Your Favourites
            </p>
            <div className={styles.header_favs__menu_products}>
              {favProducts
                ?.filter((_, index) => index < 4)
                .map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    mutationID={product.productID}
                    onRemoved={onRemoveProductHandler}
                  />
                ))}
            </div>
            {favProducts.length > 4 && (
              <div className={styles.header_favs__view_all}>
                <Link href="/profile/favourites">
                  <a>
                    View All{" "}
                    <Arrow width="15" height="8" fill={colors.black[100]} />
                  </a>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favs;
