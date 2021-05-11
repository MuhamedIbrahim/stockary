import Badge from "@/components/UI/Badge/Badge";
import { IconButton } from "@/components/UI/Button/Button";
import { Close, Heart, HeartFilled, LogoIcon } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { ProductTitle } from "@/utils/generalComponents";
import { cartRemoveProduct } from "@/utils/redux/slices/cartSlice";
import { updateFavs } from "@/utils/redux/slices/favSlice";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import styles from "./SingleProduct.module.css";

const SingleProduct = ({
  favs,
  product,
  rowStyle = false,
  cartProduct = false,
  updateQuantities = null,
  userID = "",
  dispatch = null,
}) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let flag = false;
    favs.forEach((fav) => {
      if (fav.productID === product.id) flag = true;
    });
    setIsFav(flag);
  }, [favs, product.id]);

  const onUpdateFav = useCallback(() => {
    dispatch(
      updateFavs({
        product,
        state: isFav ? "remove" : "add",
        productID: product.id,
      })
    );
  }, [isFav, product, dispatch]);

  const onUpdateCart = useCallback(
    (id) => {
      dispatch(cartRemoveProduct({ cartProdID: id, uid: userID }));
    },
    [dispatch, userID]
  );

  return (
    <div
      className={[
        styles.single_product,
        rowStyle ? styles["single_product--row"] : "",
      ].join(" ")}
      style={{ borderColor: colors.black[50] }}
    >
      <div
        className={styles.single_product__image}
        style={{ borderColor: colors.black[50] + (!rowStyle ? "70" : "") }}
      >
        <Link
          href={`/products/${cartProduct ? product.productID : product.id}`}
        >
          <a>
            {product?.condition?.length > 0 && (
              <div className={styles.single_product__bage}>
                <Badge>{product.condition[0]}</Badge>
              </div>
            )}
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <LogoIcon width="70" height="70" fill={colors.black[50]} />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.single_product__info}>
        {!product?.quantity && (
          <IconButton
            name="Favourite"
            size="md"
            bgColor={cartProduct ? "transparent" : colors.cyan[90]}
            onClick={cartProduct ? () => onUpdateCart(product.id) : onUpdateFav}
          >
            {cartProduct ? (
              <Close fill={colors.black[80]} width="15px" height="15px" />
            ) : isFav ? (
              <HeartFilled fill={colors.white[100]} width="15" height="13" />
            ) : (
              <Heart fill={colors.white[100]} width="15" height="13" />
            )}
          </IconButton>
        )}
        <Link
          href={`/products/${cartProduct ? product.productID : product.id}`}
        >
          <a
            className={styles.single_product__title}
            style={{ color: colors.black[100] }}
          >
            {
              <ProductTitle wordCount={rowStyle ? 0 : 9}>
                {product.title}
              </ProductTitle>
            }
          </a>
        </Link>
        {rowStyle && product?.details?.length > 0 && (
          <div
            className={styles.single_product__details}
            style={{ color: colors.black[80] }}
          >
            {product.details
              .filter((_, i) => i < 2)
              .map((detail) => (
                <p key={detail.id}>
                  {detail.key}: <strong>{detail.value}</strong>
                </p>
              ))}
          </div>
        )}
        {product?.quantity && (
          <p
            className={styles.single_product__price}
            style={{ color: colors.black[90], fontWeight: 500 }}
          >
            Quantity: {product.quantity}
          </p>
        )}
        <p
          className={styles.single_product__price}
          style={{
            color: product.salePrice ? colors.black[70] : colors.violet[100],
          }}
        >
          {product.salePrice && (
            <span
              style={{
                color: product.salePrice
                  ? colors.violet[100]
                  : colors.black[70],
              }}
            >
              ${product.salePrice.toFixed(2)}
            </span>
          )}
          <b>${product.price.toFixed(2)}</b>
        </p>
        {cartProduct && (
          <div className={styles.order_input}>
            Order Quantity:
            <input
              type="number"
              min={1}
              defaultValue={1}
              onChange={(e) =>
                updateQuantities(product.productID, +e.target.value)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SingleProduct);
