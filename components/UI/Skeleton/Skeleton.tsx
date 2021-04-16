import { colors } from "@/styles/theme";
import styles from "./Skeleton.module.css";

const Skeleton = ({
  number,
  height,
  width,
  bgColor = colors.white[100],
  fullwidth = false,
  ...rest
}) => {
  const lines = Array.from({ length: number });
  return (
    <div className={styles.skeleton} style={{ height, width, ...rest }}>
      {lines?.map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: bgColor,
            height: parseInt(height) / number - 3,
            width:
              index === 0
                ? "100%"
                : fullwidth
                ? "100%"
                : (10 - index) * 10 + "%",
            animationDelay: index / 3 + "s",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
