import { Button } from "@/components/UI/Button/Button";
import { PurchaseDone } from "@/styles/icons";
import { colors } from "@/styles/theme";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-top: 30px;
    color: ${colors.black[100]};
  }
`;

const CheckoutSuccess = () => {
  return (
    <div className="container st_main_section">
      <Container>
        <PurchaseDone width="100" height="100" />
        <h1 className="st_main_section__title">
          Thank you for your purchasing.
        </h1>
        <Button
          name="Continue Purchasing"
          size="lg"
          bgColor={colors.blue[100]}
          color={colors.white[100]}
          mt="30px"
          link
          href="/products"
        >
          Continue Purchasing
        </Button>
      </Container>
    </div>
  );
};

export default CheckoutSuccess;
