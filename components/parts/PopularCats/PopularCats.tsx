import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import fetcher from "@/utils/fetcher/categoriesFetcher";
import options from "@/utils/fetcher/options";
import Carousel from "react-elastic-carousel";
import useSWR from "swr";
import CarouselArrows from "./CarouselArrows/CarouselArrows";
import styles from "./PopularCats.module.css";
import SinglePopularCat from "./SinglePopularCat/SinglePopularCat";

const PopularCats = () => {
  const { data: popularCats = [], isValidating: popularCatsLoading } = useSWR(
    ["categories/popular"],
    fetcher,
    options
  );

  return (
    <>
      {popularCats?.length === 0 && !popularCatsLoading ? null : (
        <div className={[styles.popular_cats, "st_main_section"].join(" ")}>
          <div className="container">
            <div className={styles.popular_cats__content}>
              <div className={styles.popular_cats__header}>
                <h2
                  className="st_main_section__title"
                  style={{ color: colors.black[100], paddingRight: "70px" }}
                >
                  Popular Product Categories
                </h2>
              </div>
              <div className={styles.popular_cats__all_cats}>
                {popularCatsLoading ? (
                  <Skeleton
                    number={5}
                    width="100%"
                    height="190px"
                    bgColor={colors.black[80]}
                  />
                ) : (
                  <Carousel
                    isRTL={false}
                    pagination={false}
                    disableArrowsOnEnd={true}
                    renderArrow={(props) => <CarouselArrows {...props} />}
                    className="popular_cats__carousel"
                    breakPoints={[
                      {
                        width: 300,
                        itemsToShow: 2,
                      },
                      {
                        width: 500,
                        itemsToShow: 3,
                      },
                      {
                        width: 700,
                        itemsToShow: 4,
                      },
                      {
                        width: 800,
                        itemsToShow: 5,
                      },
                      {
                        width: 1000,
                        itemsToShow: 6,
                      },
                    ]}
                  >
                    {popularCats?.map(({ name, id }) => (
                      <SinglePopularCat key={id} name={name} id={id} />
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularCats;
