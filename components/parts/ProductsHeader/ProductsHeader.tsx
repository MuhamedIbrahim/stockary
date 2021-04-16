import { IconButton } from "@/components/UI/Button/Button";
import { FullList, SquareList } from "@/styles/icons";
import { colors } from "@/styles/theme";
import styles from "./ProductsHeader.module.css";

const ProductsHeader = ({ title, showStyle = "list", changed }) => {
  return (
    <div className={[styles.header, "st_main_section"].join(" ")}>
      <div className="container">
        <div className={styles.header__content}>
          <h1 style={{ color: colors.black[100] }}>{title}</h1>
          <div className={styles.header__show_style}>
            <IconButton
              className={
                showStyle === "list" ? styles.header__show_style_active : ""
              }
              size="md"
              bgColor="transparent"
              mr="10px"
              onClick={() => changed("list")}
            >
              <SquareList fill={colors.black[100]} width="16" height="16" />
            </IconButton>
            <IconButton
              className={
                showStyle === "row" ? styles.header__show_style_active : ""
              }
              size="md"
              bgColor="transparent"
              onClick={() => changed("row")}
            >
              <FullList fill={colors.black[100]} width="16" height="16" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
