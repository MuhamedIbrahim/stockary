import { colors } from "@/styles/theme";
import styles from "./Badge.module.css";

const Badge = ({
  bgColor = colors.yellow[60],
  color = colors.yellow[100],
  children,
}) => {
  return (
    <div className={styles.badge} style={{ backgroundColor: bgColor, color }}>
      {children}
    </div>
  );
};

export default Badge;
