import styles from "./FeaturedProds.module.css";
import { colors } from "@/styles/theme";
import Carousel from "react-elastic-carousel";
import { Button } from "@/components/UI/Button/Button";
import { Chevron } from "@/styles/icons";
import Image from "next/image";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import useSWR from "swr";
import options from "@/utils/fetcher/options";
import fetcher from "@/utils/fetcher/featuredProds";
import CarouselPagination from "./CarouselPagination";
import { useEffect, useState } from "react";
const FeaturedProds = () => {
  const [mobileDeviceOn, setMobileDeviceOn] = useState(true);

  const {
    data: featuredProds = [],
    isValidating: featuredProdsLoading,
  } = useSWR(!mobileDeviceOn && "featuredProds/all", fetcher, options);

  useEffect(() => {
    window.innerWidth > 769 && setMobileDeviceOn(false);
  }, []);

  return (
    <>
      {(mobileDeviceOn || featuredProds?.length === 0) &&
      !featuredProdsLoading ? null : (
        <div
          className={[styles.featured_prods, "featured_prods_carousel"].join(
            " "
          )}
          style={{ backgroundColor: colors.cyan[70] }}
        >
          <div className="container">
            <div className={styles.featured_prods__content}>
              {featuredProdsLoading ? (
                <Skeleton
                  height="298px"
                  width="100%"
                  number={9}
                  bgColor={colors.black[100]}
                />
              ) : (
                <Carousel
                  showArrows={false}
                  isRTL={false}
                  enableAutoPlay
                  autoPlaySpeed={3500}
                  className={styles.featured_prods__carousel}
                  pagination={featuredProds?.length !== 0}
                  renderPagination={(props) => (
                    <CarouselPagination {...props} styles={styles} />
                  )}
                >
                  {featuredProds?.map((prod) => (
                    <div
                      key={prod.sys.id}
                      className={styles.featured_prods__prod}
                    >
                      <div className={styles.featured_prods__prod_text}>
                        {prod.fields.title && (
                          <h1 style={{ color: colors.black[100] }}>
                            {prod.fields.title}
                          </h1>
                        )}
                        {prod.fields.subtitle && (
                          <p style={{ color: colors.black[90] }}>
                            {prod.fields.subtitle}
                          </p>
                        )}
                        <Button
                          size="xl"
                          bgColor={colors.cyan[90]}
                          color={colors.white[100]}
                          mt="40px"
                          link
                          href={prod.fields.link}
                        >
                          Shop Now
                          <Chevron
                            height="12"
                            width="7"
                            fill={colors.white[100]}
                          />
                        </Button>
                      </div>
                      <div className={styles.featured_prods__prod_image}>
                        <Image
                          onDragStart={(e) => e.preventDefault()}
                          src={"https:" + prod.fields.image.fields.file.url}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FeaturedProds;
