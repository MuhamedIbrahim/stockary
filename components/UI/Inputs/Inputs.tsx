import styles from "./Inputs.module.css";
import { colors } from "@/styles/theme";
import { useMemo } from "react";
import { Search } from "@/styles/icons";
import { IconButton } from "../Button/Button";

export const InputField = ({
  bgColor = colors.white[100],
  color = colors.black[100],
  borderColor = bgColor,
  height = "auto",
  width = "auto",
  ...rest
}) => {
  const inlineStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
      borderColor,
      color,
      height,
      width,
    }),
    []
  );

  return (
    <input type="text" className={styles.input} {...rest} style={inlineStyle} />
  );
};

export const InputSearch = ({
  bgColor = colors.white[100],
  color = colors.black[100],
  borderColor = bgColor,
  height = "auto",
  width = "auto",
  disabled = false,
  onSubmit,
  ...rest
}) => {
  const inlineStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
      borderColor,
      color,
      height,
    }),
    []
  );

  return (
    <form className={styles.input_search} style={{ width }} onSubmit={onSubmit}>
      <input
        type="text"
        className={[styles.input, styles["input--search"]].join(" ")}
        style={inlineStyle}
        {...rest}
      />
      <IconButton
        name="Search Submit"
        bgColor="transparent"
        borderColor="transparent"
        size="lg"
        type="submit"
        disabled={disabled}
      >
        <Search width="20" height="20" fill={colors.white[100]} />
      </IconButton>
    </form>
  );
};
