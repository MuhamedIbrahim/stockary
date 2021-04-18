import { colors } from "@/styles/theme";
import Image from "next/image";
import Link from "next/link";
import styles from "./SinglePopularCat.module.css";

const SinglePopularCat = ({ id, name }) => {
  return (
    <div className={styles.single_cat}>
      <div
        className={styles.single_cat__content}
        style={{ borderColor: colors.black[50] }}
      >
        <div
          className={styles.single_cat__img}
          style={{ backgroundColor: colors.cyan[70] }}
        >
          <Link href={`products?cat=${id}`}>
            <a>
              <Image
                src={`/images/categories/${name.split(" ").join("")}.png`}
                alt={name}
                height="120"
                width="138"
                objectFit="contain"
                onDragStart={(e) => e.preventDefault()}
              />
            </a>
          </Link>
        </div>
        <Link href={`products?cat=${id}`}>
          <a
            className={styles.single_cat__title}
            style={{ color: colors.black[100] }}
          >
            {name}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SinglePopularCat;
