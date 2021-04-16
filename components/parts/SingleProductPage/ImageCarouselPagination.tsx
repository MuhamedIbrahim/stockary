import { colors } from "@/styles/theme";
import Image from "next/image";
import styled from "styled-components";

const Component = styled.button.attrs((props) => ({
  ...props,
}))`
  position: relative;
  height: 70px;
  border-radius: 10px;
  background: none;
  border: 1px solid;
  border-color: ${colors.black[50]};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  outline: none;
  margin-bottom: 15px;
  &:after {
    content: "";
    background-color: ${colors.cyan[90]};
    width: 70%;
    height: 2px;
    position: absolute;
    top: 100%;
    left: 15%;
    display: ${({ disabled }) => (disabled ? "block" : "none")};
    border-radius: 1px;
  }
  & > div {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    top: 10px !important;
    left: 10px !important;
  }
  @media (min-width: 768px) {
    width: calc((100% - 105px) / 8);
    &:not(:nth-child(8n)) {
      margin-right: 15px;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    width: calc((100% - 75px) / 6);
    &:not(:nth-child(6n)) {
      margin-right: 15px;
    }
  }
  @media (max-width: 576px) {
    width: calc((100% - 30px) / 3);
    &:not(:nth-child(3n)) {
      margin-right: 15px;
    }
    & > div {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      top: 5px !important;
      left: 5px !important;
    }
  }
`;

const ImageCarouselPagination = ({
  images = [],
  pages = [],
  activePage,
  onClick,
  styles,
}) => {
  return (
    <div className={styles.product__images_carousel_pagination}>
      {pages.map((page) => (
        <Component
          onClick={() => onClick(page)}
          key={page}
          disabled={activePage === page}
        >
          {images[page] && (
            <Image src={images[page]} layout="fill" objectFit="contain" />
          )}
        </Component>
      ))}
    </div>
  );
};

export default ImageCarouselPagination;
