import { Button, IconButton } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { Arrow, Basket, BasketFilled } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { SimpleProduct } from "@/utils/dataTypes";
import fetcher, { removeProductCart } from "@/utils/fetcher/cartFetcher";
import swrOptions from "@/utils/fetcher/options";
import { useAuth } from "@/utils/useAuth";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Product from "../Favs/Product/Product";
import styles from "./Cart.module.css";

const Cart = () => {
  const [mobileDeviceOn, setMobileDeviceOn] = useState(true);

  const cartMenuRef = useRef(null);

  const { user } = useAuth();

  const {
    data: cartProducts = [],
    mutate: mutateCartProducts,
    isValidating: cartLoading,
  } = useSWR(!mobileDeviceOn && user && "cart/all", fetcher, swrOptions);

  const toggleCartMenuHandler = useCallback(() => {
    cartMenuRef?.current?.classList.contains(
      styles["header_cart__menu--active"]
    )
      ? cartMenuRef.current.classList.remove(
          styles["header_cart__menu--active"]
        )
      : cartMenuRef.current.classList.add(styles["header_cart__menu--active"]);
  }, []);

  const closeCartMenuHandler = useCallback((e) => {
    if (
      !e.target.closest("#header_cart__menu_container") ||
      e.target.closest("#header_cart__menu_close")
    ) {
      cartMenuRef.current.classList.contains(
        styles["header_cart__menu--active"]
      ) &&
        cartMenuRef.current.classList.remove(
          styles["header_cart__menu--active"]
        );
    }
  }, []);

  useEffect(() => {
    window.innerWidth > 993 && setMobileDeviceOn(false);
  }, []);

  const onRemoveProductHandler = useCallback((id) => {
    mutateCartProducts(async (currentCartProducts) => {
      const updatedCartProducts = currentCartProducts.filter((cartProd) => {
        return (cartProd as SimpleProduct).id !== id;
      });
      await removeProductCart(id);
      return updatedCartProducts;
    });
  }, []);

  return (
    <div className={styles.header_cart}>
      <div className={styles.header_cart__icon}>
        <IconButton
          size="lg"
          bgColor={colors.white[90]}
          borderColor="transparent"
          name="Cart"
          ml="15px"
          onClick={toggleCartMenuHandler}
          link={mobileDeviceOn}
          href="/cart"
        >
          {cartProducts?.length > 0 ? (
            <BasketFilled fill={colors.white[100]} width="20" height="20" />
          ) : (
            <Basket fill={colors.white[100]} width="20" height="20" />
          )}
        </IconButton>
        {cartProducts?.length > 0 && (
          <span
            style={{ backgroundColor: colors.red[90] }}
            className={styles.header_cart__icon_point}
          ></span>
        )}
      </div>
      <div
        ref={cartMenuRef}
        className={styles.header_cart__menu}
        onClick={closeCartMenuHandler}
      >
        <div
          className={styles.header_cart__menu_container}
          id="header_cart__menu_container"
          style={{ backgroundColor: colors.white[100] }}
        >
          <Button
            name="Back Home"
            id="header_cart__menu_close"
            size="xs"
            bgColor="transparent"
            onClick={closeCartMenuHandler}
          >
            <Arrow width="15" height="8" fill={colors.black[100]} dir="-180" />
            Back
          </Button>
          <p
            className={styles.header_cart__menu_title}
            style={{ color: colors.black[100] }}
          >
            Your Cart{" "}
            <sup style={{ color: colors.black[60] }}>
              ({cartProducts?.length})
            </sup>
          </p>
          <div className={styles.header_cart__menu_content}>
            {cartLoading ? (
              <Skeleton
                width="100%"
                height="100%"
                number={5}
                bgColor={colors.black[80]}
                maxHeight="100px"
              />
            ) : (
              <>
                {cartProducts?.length === 0 ? (
                  <div className={styles.header_cart__menu_empty}>
                    <div
                      className={styles.header_cart__menu_empty_icon}
                      style={{ backgroundColor: colors.cyan[70] }}
                    >
                      <Basket width="30" height="30" fill={colors.cyan[90]} />
                    </div>
                    <p style={{ color: colors.black[80] }}>
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={styles.header_cart__menu_products}>
                      {cartProducts
                        ?.filter((_, index) => index < 5)
                        ?.map((product) => (
                          <Product
                            key={product.id}
                            product={product}
                            onRemoved={onRemoveProductHandler}
                            mutationID={product.id}
                          />
                        ))}
                    </div>
                    <div className={styles.header_cart__view_all}>
                      <Link href="/cart">
                        <a>
                          View Cart{" "}
                          <Arrow
                            width="15"
                            height="8"
                            fill={colors.black[100]}
                          />
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
