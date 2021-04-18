import styles from "./Button.module.css";
import { colors } from "@/styles/theme";
import { useMemo } from "react";
import Link from "next/link";

export const Button = ({
  children,
  name,
  link = false,
  href = "",
  size = "sm",
  bgColor = colors.white[100],
  borderColor = bgColor,
  color = colors.black[100],
  mr = "0",
  ml = "0",
  mt = "0",
  mb = "0",
  m = "0",
  className = "",
  ...rest
}) => {
  const inlineStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
      color,
      borderColor,
      margin: m,
      marginRight: mr,
      marginLeft: ml,
      marginBottom: mb,
      marginTop: mt,
    }),
    []
  );

  return link ? (
    <Link href={href}>
      <a
        id={name}
        style={inlineStyle}
        className={[styles.button, styles[`button--${size}`], className].join(
          " "
        )}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      name={name}
      style={inlineStyle}
      className={[styles.button, styles[`button--${size}`], className].join(
        " "
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const IconButton = ({
  children,
  name,
  link = false,
  href = "",
  size = "sm",
  bgColor = colors.white[100],
  borderColor = bgColor,
  mr = "0",
  ml = "0",
  mt = "0",
  mb = "0",
  m = "0",
  className = "",
  ...rest
}) => {
  const inlineStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
      borderColor,
      margin: m,
      marginRight: mr,
      marginLeft: ml,
      marginBottom: mb,
      marginTop: mt,
    }),
    []
  );

  return link ? (
    <Link href={href}>
      <a
        id={name}
        style={inlineStyle}
        className={[
          styles.icon_button,
          styles[`icon_button--${size}`],
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      name={name}
      style={inlineStyle}
      className={[
        styles.icon_button,
        styles[`icon_button--${size}`],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};
