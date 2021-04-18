import Badge from "@/components/UI/Badge/Badge";
import { Button } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import options from "@/utils/fetcher/options";
import fetcher from "@/utils/fetcher/productAd";
import Image from "next/image";
import useSWR from "swr";
import styles from "./ProductAd.module.css";

const ProductAd = ({
  bgColor = colors.red[70],
  badgeBgColor = colors.red[80],
  badgeColor = colors.red[100],
  rowStyle,
  adID,
}) => {
  const { data: adData, isValidating: adDataLoading } = useSWR(
    `ads/${adID}`,
    fetcher,
    options
  );

  return (
    <>
      {!adData?.productName && !adDataLoading ? null : (
        <div className={[styles.product_ad, "st_main_section"].join(" ")}>
          <div className="container">
            {adDataLoading ? (
              <Skeleton
                number={rowStyle ? 6 : 8}
                width="100%"
                height={rowStyle ? "220px" : "340px"}
                bgColor={colors.black[80]}
              />
            ) : (
              <div
                className={[
                  styles.product_ad__content,
                  rowStyle ? styles["product_ad__content--row"] : "",
                ].join(" ")}
                style={{ backgroundColor: bgColor }}
              >
                <div className={styles.product_ad__image}>
                  <Image
                    src={`http:${adData?.productImage.fields.file.url}`}
                    alt={adData?.productName}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className={styles.product_ad__row}>
                  <div className={styles.product_ad__text}>
                    <Badge bgColor={badgeBgColor} color={badgeColor}>
                      {adData?.productBadge}
                    </Badge>
                    <p style={{ color: colors.black[100] }}>
                      {adData?.productName}
                    </p>
                  </div>
                  <div className={styles.product_ad__link}>
                    <Button
                      name="Shop Now"
                      size="lg"
                      color={colors.white[100]}
                      bgColor={colors.blue[100]}
                      link
                      href={adData?.productLink || "#"}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductAd;
