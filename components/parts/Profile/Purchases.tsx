import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import options from "@/utils/fetcher/options";
import fetcher from "@/utils/fetcher/purchasesFetcher";
import { useAuth } from "@/utils/useAuth";
import { format } from "date-fns";
import styled from "styled-components";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductsContainer } from "./ProfileContent";

const PurchaseContainer = styled.div`
  &:not(:last-child) {
    border-bottom: 1px dashed ${colors.black[60]};
    margin-bottom: 30px;
    padding-bottom: 30px;
  }
  .date_purchased {
    color: ${colors.black[90]};
    font-size: 14px;
    margin-top: 10px;
    display: block;
    text-align: right;
  }
  > div:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const Purchases = () => {
  const { user } = useAuth();

  const { data: purchasesProds = [], isValidating: isLoading } = useSWR(
    user && user.uid,
    fetcher,
    options
  );

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
      ) : purchasesProds.length === 0 ? (
        <p>Your purchases is empty.</p>
      ) : (
        purchasesProds.map((purchase) => (
          <PurchaseContainer key={purchase.datePurchased}>
            {purchase.products.map((product) => (
              <SingleProduct
                key={product.id}
                product={{
                  ...product,
                  title: product.title.split(" "),
                  images: [product.image],
                }}
                favs={[]}
                rowStyle
              />
            ))}
            <span className="date_purchased">
              {format(new Date(purchase.datePurchased), "dd MMM, yyyy")}
            </span>
          </PurchaseContainer>
        ))
      )}
    </ProductsContainer>
  );
};

export default Purchases;
