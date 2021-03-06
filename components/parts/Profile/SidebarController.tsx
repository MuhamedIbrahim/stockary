import { colors } from "@/styles/theme";
import styled from "styled-components";
import { User, Purchases, Heart, Basket } from "@/styles/icons";
import Link from "next/link";
import { Button } from "@/components/UI/Button/Button";

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: calc(25% - 15px) calc(75% - 15px);
  align-items: start;
  gap: 30px;
  @media (max-width: 992px) {
    grid-template-columns: 30% 70%;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const Container = styled.div`
  padding: 20px;
  border: 1px solid ${colors.black[50]};
  border-radius: 15px;
  margin-top: 40px;
`;

const UserCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.black[40]};
  p {
    margin: 15px 0 0;
    color: ${colors.black[100]};
    font-weight: 600;
    font-size: 18px;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  a {
    font-size: 14px;
    font-weight: 500;
    padding: 12px 15px;
    border-radius: 7px;
    color: ${colors.black[100]};
    &.active {
      background-color: ${colors.cyan[50]};
      border-right: 4px solid ${colors.cyan[90]};
    }
    svg {
      margin-right: 10px;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const SidebarController = ({ userPhoto, activePage = "favourites" }) => {
  return (
    <Container>
      <UserCotainer>
        <User
          userPhoto={userPhoto}
          width="45px"
          height="45px"
          fill={colors.black[60]}
        />
        <p>Muhamed Ibrahim</p>
      </UserCotainer>
      <LinksContainer>
        {activePage === "purchases" ? (
          <a className="active">
            <Purchases
              fill={
                activePage === "purchases" ? colors.cyan[90] : colors.black[100]
              }
              width="18px"
              height="18px"
            />
            Purchases
          </a>
        ) : (
          <Link href="/profile/purchases">
            <a>
              <Purchases fill={colors.black[100]} width="18px" height="18px" />
              Purchases
            </a>
          </Link>
        )}
        {activePage === "favourites" ? (
          <a className="active">
            <Heart fill={colors.cyan[90]} width="18px" height="18px" />{" "}
            Favourites
          </a>
        ) : (
          <Link href="/profile/favourites">
            <a>
              <Heart fill={colors.black[100]} width="18px" height="18px" />{" "}
              Favourites
            </a>
          </Link>
        )}
        {activePage === "cart" ? (
          <a className="active">
            <Basket fill={colors.cyan[90]} width="18px" height="18px" /> Cart
          </a>
        ) : (
          <Link href="/profile/cart">
            <a>
              <Basket fill={colors.black[100]} width="18px" height="18px" />{" "}
              Cart
            </a>
          </Link>
        )}
      </LinksContainer>
    </Container>
  );
};

export default SidebarController;
