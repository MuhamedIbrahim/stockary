import Badge from "@/components/UI/Badge/Badge";
import { IconButton } from "@/components/UI/Button/Button";
import { Heart, HeartFilled } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { onUpdateFavProductsHandler } from "@/utils/fetcher/favsFetcher";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./SingleProduct.module.css";

const SingleProduct = ({
  favs,
  product,
  rowStyle = false,
  mutateFavProducts,
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
    onUpdateFavProductsHandler(product, isFav ? "remove" : "add", product.id);
    mutateFavProducts();
  }, [isFav, product]);

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
        <Link href={`/products/${product.id}`}>
          <a>
            {product?.condition.length > 0 && (
              <div className={styles.single_product__bage}>
                <Badge>{product.condition[0]}</Badge>
              </div>
            )}
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <svg height="66" fill={colors.black[50]} viewBox="0 0 50 66">
                <path
                  fillRule="evenodd"
                  d="M29.34 14.51a8.4 8.4 0 00-5.57-1.8c-1.95 0-3.52.5-4.71 1.52-1.2 1.03-1.8 2.5-1.8 4.41 0 2.1 1.01 3.74 3.02 4.92 2.02 1.17 5.16 2.44 9.44 3.8a88.38 88.38 0 0110.42 4.08 19.8 19.8 0 016.94 5.65c1.94 2.48 2.92 5.66 2.92 9.56 0 3.7-.96 7.08-2.88 10.1A20.04 20.04 0 0138.77 64 25 25 0 0132.83 66l-6.71-12.05a8.51 8.51 0 004.92-1.6 5.4 5.4 0 002.07-4.5c0-1.6-.55-2.94-1.65-3.99a13.37 13.37 0 00-4.05-2.6 66.03 66.03 0 00-6.84-2.31 75.2 75.2 0 01-10.48-3.9 19.29 19.29 0 01-6.98-5.75C1.16 26.77.2 23.46.2 19.38c0-6.06 2.23-10.8 6.7-14.23C11.35 1.72 17.17 0 24.34 0c7.3 0 13.18 1.72 17.64 5.15 4.47 3.43 6.86 8.2 7.17 14.32H31.7a6.68 6.68 0 00-2.36-4.96zm-9.62 37.56c1.13 1 2.54 1.6 4.22 1.8L17.45 65.8a30.09 30.09 0 01-4.62-1.43 21.17 21.17 0 01-9.2-6.86C1.33 54.47.13 50.82 0 46.55h17.17c.25 2.41 1.1 4.25 2.55 5.52z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </a>
        </Link>
      </div>
      <div className={styles.single_product__info}>
        <IconButton size="md" bgColor={colors.cyan[90]} onClick={onUpdateFav}>
          {isFav ? (
            <HeartFilled fill={colors.white[100]} width="15" height="13" />
          ) : (
            <Heart fill={colors.white[100]} width="15" height="13" />
          )}
        </IconButton>
        <Link href={`/products/${product.id}`}>
          <a
            className={styles.single_product__title}
            style={{ color: colors.black[100] }}
          >
            {product.title}
          </a>
        </Link>
        {rowStyle && product.details.length > 0 && (
          <div
            className={styles.single_product__details}
            style={{ color: colors.black[80] }}
          >
            {product.details.map((detail) => (
              <p key={detail.id}>
                {detail.key}: <strong>{detail.value}</strong>
              </p>
            ))}
          </div>
        )}
        <p
          className={styles.single_product__price}
          style={{
            color: product.onsale ? colors.black[70] : colors.violet[100],
          }}
        >
          {product.onsale && (
            <span
              style={{
                color: product.onsale ? colors.violet[100] : colors.black[70],
              }}
            >
              ${product.salePrice}
            </span>
          )}
          <b>${product.price}</b>
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
