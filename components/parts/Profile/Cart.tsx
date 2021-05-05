import { Button } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { createStripeCheckout } from "@/lib/firebase";
import { colors } from "@/styles/theme";
import fetcher from "@/utils/fetcher/cartFetcher";
import options from "@/utils/fetcher/options";
import { useAuth } from "@/utils/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductsContainer } from "./ProfileContent";

const SubtotalContainer = styled.div`
  div {
    margin-left: auto;
    font-weight: 500;
    border-top: 1px solid ${colors.black[50]};
    padding-top: 30px;
    color: ${colors.violet[100]};
  }
`;

const Cart = () => {
  const [orderQuantities, setOrderQuantities] = useState([]);

  const { user } = useAuth();

  const {
    data: cartProducts = [],
    mutate: mutateCartProducts,
    isValidating: isLoading,
  } = useSWR(user && ["cart/all", user.uid], fetcher, options);

  useEffect(() => {
    setOrderQuantities(
      cartProducts.map((prod) => ({
        title: prod.title.join(" "),
        id: prod.productID,
        quantity: 1,
        price: prod.salePrice ? prod.salePrice : prod.price,
        image: prod.image,
      }))
    );
  }, [isLoading]);

  const subtotalMoney = useMemo(() => {
    return orderQuantities
      .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
      .toFixed(2);
  }, [orderQuantities]);

  const onUpdateQuantitiesHandler = useCallback(
    (productID, newQuanitityValue) => {
      setOrderQuantities((currentQuantities) => {
        const updatedQuantities = currentQuantities.map((elm) =>
          Object.assign({}, elm)
        );
        updatedQuantities.forEach((elm) => {
          if (elm.id === productID) elm.quantity = newQuanitityValue;
        });
        return updatedQuantities;
      });
    },
    []
  );

  const onCheckoutHandler = useCallback(async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    createStripeCheckout([orderQuantities, user.uid]).then(async (res) => {
      const sessionId = res.data.id;
      stripe.redirectToCheckout({ sessionId });
    });
  }, [orderQuantities, user]);

  return (
    <ProductsContainer>
      {isLoading ? (
        <Skeleton
          number={10}
          height="500px"
          width="100%"
          fullwidth
          bgColor={colors.black[80]}
        />
      ) : cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartProducts.map((prod) => (
            <SingleProduct
              key={prod.productID}
              product={{
                ...prod,
                images: [prod.image],
              }}
              rowStyle={true}
              favs={[]}
              mutateFavProducts={() => {}}
              cartProduct
              mutateCartProducts={mutateCartProducts}
              updateQuantities={onUpdateQuantitiesHandler}
              userID={user.uid}
            />
          ))}
          <SubtotalContainer>
            <div>
              Subtotal: <b>${subtotalMoney}</b>
            </div>
          </SubtotalContainer>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <Button
              name="Go Checkout"
              size="lg"
              bgColor={colors.blue[100]}
              color={colors.white[100]}
              onClick={onCheckoutHandler}
            >
              Go Checkout
            </Button>
          </div>
        </>
      )}
    </ProductsContainer>
  );
};

export default Cart;
