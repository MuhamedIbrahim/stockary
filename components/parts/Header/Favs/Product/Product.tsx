import styles from "./Product.module.css";
import { Close } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { IconButton } from "@/components/UI/Button/Button";
import Image from "next/image";
import { simpleProductProps } from "@/utils/dataTypes";

const Product = ({ product }: simpleProductProps) => {
  return (
    <div className={styles.fav_product}>
      <div
        className={styles.fav_product__img}
        style={{ borderColor: colors.black[50] }}
      >
        <Image
          src="/item_prod.jpg"
          alt="iPhone"
          width="70"
          height="65"
          objectFit="contain"
        />
      </div>
      <div className={styles.fav_product__text}>
        <h5
          className={styles.fav_product__title}
          style={{ color: colors.black[100] }}
        >
          <a href={"/products/" + product?.productID || "#"}>
            {product?.title}
          </a>
        </h5>
        <span
          className={styles.fav_product__price}
          style={{ color: colors.violet[100] }}
        >
          ${product?.price || "00.00"}
        </span>
      </div>
      <IconButton size="sm" bgColor="transparent">
        <Close height="12" width="12" fill={colors.black[80]} />
      </IconButton>
    </div>
  );
};

export default Product;
