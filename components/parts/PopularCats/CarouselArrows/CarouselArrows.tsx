import { Arrow } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { memo } from "react";
import styles from "./CarouselArrows.module.css";

const CarouselArrows = ({ type, onClick, isEdge }) => {
  return (
    <button
      disabled={isEdge}
      className={[styles.arrow, styles[`arrow_${type}`]].join(" ")}
      onClick={onClick}
    >
      <Arrow
        height="10"
        width="20"
        fill={isEdge ? colors.black[60] : colors.cyan[90]}
        dir={type === "PREV" ? "-180" : "0"}
      />
    </button>
  );
};

export default memo(CarouselArrows);
