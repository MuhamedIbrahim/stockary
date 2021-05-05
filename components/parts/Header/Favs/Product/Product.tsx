import styles from "./Product.module.css";
import { Close } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { IconButton } from "@/components/UI/Button/Button";
import Image from "next/image";
import { simpleProductProps } from "@/utils/dataTypes";
import Link from "next/link";
import { ProductTitle } from "@/utils/generalComponents";

const Product = ({ product, onRemoved, mutationID }: simpleProductProps) => {
  return (
    <div className={styles.fav_product}>
      <div
        className={styles.fav_product__img}
        style={{ borderColor: colors.black[50] }}
      >
        {product.image ? (
          <Image
            alt={product.title.join(" ")}
            src={product.image}
            width="70"
            height="65"
            objectFit="contain"
          />
        ) : (
          <svg height="30" fill={colors.black[50]} viewBox="0 0 50 66">
            <path
              fillRule="evenodd"
              d="M29.34 14.51a8.4 8.4 0 00-5.57-1.8c-1.95 0-3.52.5-4.71 1.52-1.2 1.03-1.8 2.5-1.8 4.41 0 2.1 1.01 3.74 3.02 4.92 2.02 1.17 5.16 2.44 9.44 3.8a88.38 88.38 0 0110.42 4.08 19.8 19.8 0 016.94 5.65c1.94 2.48 2.92 5.66 2.92 9.56 0 3.7-.96 7.08-2.88 10.1A20.04 20.04 0 0138.77 64 25 25 0 0132.83 66l-6.71-12.05a8.51 8.51 0 004.92-1.6 5.4 5.4 0 002.07-4.5c0-1.6-.55-2.94-1.65-3.99a13.37 13.37 0 00-4.05-2.6 66.03 66.03 0 00-6.84-2.31 75.2 75.2 0 01-10.48-3.9 19.29 19.29 0 01-6.98-5.75C1.16 26.77.2 23.46.2 19.38c0-6.06 2.23-10.8 6.7-14.23C11.35 1.72 17.17 0 24.34 0c7.3 0 13.18 1.72 17.64 5.15 4.47 3.43 6.86 8.2 7.17 14.32H31.7a6.68 6.68 0 00-2.36-4.96zm-9.62 37.56c1.13 1 2.54 1.6 4.22 1.8L17.45 65.8a30.09 30.09 0 01-4.62-1.43 21.17 21.17 0 01-9.2-6.86C1.33 54.47.13 50.82 0 46.55h17.17c.25 2.41 1.1 4.25 2.55 5.52z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className={styles.fav_product__text}>
        <h5
          className={styles.fav_product__title}
          style={{ color: colors.black[100] }}
        >
          <Link href={"/products/" + product.productID}>
            <a>
              <ProductTitle wordCount={6}>{product.title}</ProductTitle>
            </a>
          </Link>
        </h5>
        <span
          className={styles.fav_product__price}
          style={{ color: colors.violet[100] }}
        >
          {product?.salePrice ? (
            <>
              <b>${product.salePrice}</b>
              <b style={{ color: colors.black[70] }}>${product.price}</b>
            </>
          ) : (
            <b>${product?.price}</b>
          )}
        </span>
      </div>
      <IconButton
        name="Remove Product"
        size="sm"
        bgColor="transparent"
        onClick={() => {
          onRemoved(mutationID);
        }}
      >
        <Close height="12" width="12" fill={colors.black[80]} />
      </IconButton>
    </div>
  );
};

export default Product;
