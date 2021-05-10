import { colors } from "@/styles/theme";
import styled from "styled-components";
import Cart from "./Cart";
import Favourites from "./Favourites";
import Purchases from "./Purchases";

const Content = styled.div`
  margin-top: 40px;
  h1 {
    font-size: 30px;
    margin: 0 0 20px;
  }
  > p {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    color: ${colors.black[80]};
  }
`;

export const ProductsContainer = styled.div`
  > div:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const ProfileContent = ({ title, pageType }) => {
  return (
    <Content>
      <h1>{title}</h1>
      {pageType === "favourites" && <Favourites />}
      {pageType === "cart" && <Cart />}
      {pageType === "purchases" && <Purchases />}
    </Content>
  );
};

export default ProfileContent;
