import { IconButton } from "@/components/UI/Button/Button";
import { Arrow, Heart, HeartFilled } from "@/styles/icons";
import { colors } from "@/styles/theme";
import styles from "./Favs.module.css";
import Product from "./Product/Product";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const Favs = React.memo(() => {
  const [favProducts, setFavProducts] = useState([]);

  const favMenuRef = useRef(null);

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

  useEffect(() => {
    if (window.innerWidth < 993) {
      const favProductsCached = JSON.parse(
        localStorage.getItem("stockaryFavProds") || "[]"
      );
      setFavProducts(favProductsCached);
      document.addEventListener("click", closeFavMenuHandler);
      return () => {
        document.removeEventListener("click", closeFavMenuHandler);
      };
    }
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
          {favProducts?.length > 0 ? (
            <HeartFilled width="20" height="20" fill={colors.white[100]} />
          ) : (
            <Heart width="20" height="20" fill={colors.white[100]} />
          )}
        </IconButton>
        {favProducts?.length > 0 && (
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
        {favProducts?.length === 0 ? (
          <p
            className={styles.header_favs__menu_empty}
            style={{ color: colors.black[60] }}
          >
            You don't have favourite products.
          </p>
        ) : (
          <>
            <h4
              className={styles.header_favs__menu_title}
              style={{ color: colors.black[100] }}
            >
              Your Favourites
            </h4>
            <div className={styles.header_favs__menu_products}>
              {favProducts
                ?.filter((_, index) => index < 4)
                .map(({ id, image, price, title, productID }) => (
                  <Product
                    key={id}
                    product={{ image, price, title, productID }}
                  />
                ))}
            </div>
            {favProducts?.length > 4 && (
              <div className={styles.header_favs__view_all}>
                <Link href="#">
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
});

export default Favs;
