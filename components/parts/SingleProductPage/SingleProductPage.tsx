import { Heart, HeartFilled, StarFilled, User } from "@/styles/icons";
import { colors } from "@/styles/theme";
import styles from "./SingleProductPage.module.css";
import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, IconButton } from "@/components/UI/Button/Button";
import Carousel from "react-elastic-carousel";
import Image from "next/image";
import ImageCarouselPagination from "./ImageCarouselPagination";
import favFetcher, {
  onUpdateFavProductsHandler,
} from "@/utils/fetcher/favsFetcher";
import options from "@/utils/fetcher/options";
import useSWR from "swr";
import { useRouter } from "next/router";
import cartFetcher, { addProductCart } from "@/utils/fetcher/cartFetcher";
import Badge from "@/components/UI/Badge/Badge";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { SimpleProduct } from "@/utils/dataTypes";
import { useAuth } from "@/utils/useAuth";

const SidebarBox = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.black[50]};
  padding: 20px;
  &:not(:last-child) {
    @media (min-width: 992px) {
      margin-bottom: 30px;
    }
  }
`;

const ImageItemCarousel = styled.div.attrs((props) => ({
  ...props,
}))`
  position: relative;
  height: 400px;
  width: 100%;
  outline: none;
  & > div {
    height: calc(100% - 40px);
  }
`;

const SingleProductPage = ({ product }) => {
  const { user, signin } = useAuth();

  const [isFav, setIsFav] = useState(false);

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const router = useRouter();

  const { data: cartProducts = [], mutate: mutateCartProducts } = useSWR(
    user && "cart/all",
    cartFetcher,
    options
  );

  const productRating = useMemo(() => {
    return product?.reviews
      ? product.reviews.reduce((acc, curr) => acc + +curr.rating, 0)
      : 0;
  }, [product]);

  const { data: favProducts = [], mutate: mutateFavProducts } = useSWR(
    "favs",
    favFetcher,
    options
  );

  useEffect(() => {
    let flag = false;
    favProducts.forEach((fav) => {
      if (fav.productID === router.query.id) flag = true;
    });
    setIsFav(flag);
  }, [favProducts, router.query.id]);

  useEffect(() => {
    let flag = false;
    cartProducts.forEach((prod) => {
      if ((prod as SimpleProduct).productID === router.query.id) flag = true;
    });
    if (flag) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setIsProductsLoading(false);
    }
  }, [product]);

  const onUpdateFav = useCallback(() => {
    onUpdateFavProductsHandler(
      product,
      isFav ? "remove" : "add",
      router.query.id
    );
    mutateFavProducts();
  }, [isFav, product, router.query.id]);

  const onAddToCartHandler = useCallback(async () => {
    if (!user) {
      await signin();
    } else {
      let flag = false;
      cartProducts.forEach((prod) => {
        if ((prod as SimpleProduct).productID === router.query.id) flag = true;
      });

      if (!flag) {
        const addedAt = Date.now();
        await addProductCart(product, router.query.id, addedAt);
        setIsAddedToCart(true);
        mutateCartProducts();
      }
    }
  }, [product, router.query.id, router.reload, cartProducts, user]);

  return (
    <div className="st_main_section">
      <div className="container">
        <h1
          className={styles.product__title}
          style={{ color: colors.black[100] }}
        >
          {isProductsLoading ? (
            <Skeleton
              width="100%"
              height="36px"
              number={2}
              bgColor={colors.black[80]}
              fullwidth
            />
          ) : (
            product.title
          )}
        </h1>
        <div className={styles.product__container}>
          <div
            className={styles.product__images}
            style={{ borderColor: colors.black[50] }}
          >
            {isProductsLoading ? (
              <Skeleton
                width="100%"
                height="400px"
                number={12}
                bgColor={colors.black[80]}
                fullwidth
              />
            ) : (
              <>
                {product.condition.length > 0 && (
                  <div className={styles.product__images_badge}>
                    <Badge>{product.condition[0]}</Badge>
                  </div>
                )}
                <IconButton
                  name="Favourite"
                  size="lg"
                  bgColor={colors.cyan[90]}
                  onClick={onUpdateFav}
                >
                  {isFav ? (
                    <HeartFilled
                      fill={colors.white[100]}
                      width="19"
                      height="17"
                    />
                  ) : (
                    <Heart fill={colors.white[100]} width="19" height="17" />
                  )}
                </IconButton>
                <Carousel
                  isRTL={false}
                  showArrows={false}
                  renderPagination={(props) => (
                    <ImageCarouselPagination
                      images={product.images}
                      {...props}
                      styles={styles}
                    />
                  )}
                  className={styles.product__images_carousel}
                >
                  {product.images.map((image, index) => (
                    <ImageItemCarousel
                      key={index}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <Image
                        src={image}
                        alt={product.title}
                        layout="fill"
                        objectFit="contain"
                      />
                    </ImageItemCarousel>
                  )) || <div></div>}
                </Carousel>
              </>
            )}
          </div>
          <div className={styles.product__details}>
            <h2 className={styles.product__subtitle}>Details</h2>
            {isProductsLoading ? (
              <Skeleton
                width="100%"
                height="200px"
                number={6}
                bgColor={colors.black[80]}
                fullwidth
              />
            ) : (
              <div className={styles.product__details_content}>
                {product.details.map((detail) => (
                  <div key={detail.id}>
                    <span style={{ color: colors.black[85] }}>
                      {detail.key}
                    </span>
                    <span style={{ color: colors.black[90] }}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.product__description}>
            <h2 className={styles.product__subtitle}>Description</h2>
            {isProductsLoading ? (
              <Skeleton
                width="100%"
                height="200px"
                number={6}
                bgColor={colors.black[80]}
                fullwidth
              />
            ) : (
              <p style={{ color: colors.black[85] }}>{product.description}</p>
            )}
          </div>
          <div className={styles.product__reviews}>
            <h2 className={styles.product__subtitle}>Reviews</h2>
            {isProductsLoading ? (
              <Skeleton
                width="100%"
                height="200px"
                number={6}
                bgColor={colors.black[80]}
                fullwidth
              />
            ) : (
              <div className={styles.product_reviews__content}>
                {product.reviews.length === 0 ? (
                  <p style={{ color: colors.black[80] }}>No reviews yet.</p>
                ) : (
                  product.reviews.map((review) => (
                    <div
                      className={styles.product_reviews__single}
                      key={review.id}
                    >
                      <p style={{ color: colors.black[100] }}>
                        {review.reviewer}
                        <span className={styles.product_reviews__single_rating}>
                          {new Array(review.rating)
                            .fill(review.rating)
                            .map((_, index) => (
                              <StarFilled
                                key={index}
                                height="15"
                                width="15"
                                fill={colors.yellow[90]}
                              />
                            ))}
                        </span>
                      </p>
                      <p style={{ color: colors.black[85] }}>{review.review}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className={styles.product__sidebar}>
            <SidebarBox>
              {isProductsLoading ? (
                <Skeleton
                  width="100%"
                  height="140px"
                  number={5}
                  bgColor={colors.black[80]}
                  fullwidth
                />
              ) : (
                <>
                  <div className={styles.product__price_box_header}>
                    <span style={{ color: colors.violet[100] }}>
                      ${product.price}
                    </span>
                    <span style={{ color: colors.black[80] }}>
                      {productRating}/5
                      <span className={styles.product_reviews__single_rating}>
                        <StarFilled
                          height="13"
                          width="13"
                          fill={colors.yellow[90]}
                        />
                      </span>
                    </span>
                  </div>
                  <div className={styles.product__sidebar_box_cta}>
                    {isAddedToCart ? (
                      <Button
                        name="Checkout"
                        size="lg"
                        bgColor={colors.cyan[90]}
                        color={colors.white[100]}
                        mt="20px"
                      >
                        Go checkout
                      </Button>
                    ) : (
                      <Button
                        name="Add To Cart"
                        size="lg"
                        bgColor={colors.cyan[90]}
                        color={colors.white[100]}
                        mt="20px"
                        onClick={onAddToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </>
              )}
            </SidebarBox>
            <SidebarBox>
              {isProductsLoading ? (
                <Skeleton
                  width="100%"
                  height="140px"
                  number={5}
                  bgColor={colors.black[80]}
                  fullwidth
                />
              ) : (
                <>
                  <div className={styles.product__retailer_box_header}>
                    <div className={styles.product__retailer_box_image}>
                      <User
                        width="45px"
                        height="45px"
                        fill={colors.black[60]}
                        userPhoto={product.retailer.image}
                      />
                    </div>
                    <div
                      className={styles.product__retailer_box_title}
                      style={{ color: colors.black[100] }}
                    >
                      {product.retailer.name}
                    </div>
                  </div>
                  <div className={styles.product__sidebar_box_cta}>
                    <Button
                      name="Retailer Profile"
                      size="lg"
                      bgColor={colors.cyan[50]}
                      color={colors.cyan[90]}
                      mt="20px"
                    >
                      Show Profile
                    </Button>
                  </div>
                </>
              )}
            </SidebarBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
