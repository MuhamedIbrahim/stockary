import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { filterConditionContent, filterPriceContent } from "@/config";
import { Check } from "@/styles/icons";
import { colors } from "@/styles/theme";
import { memo } from "react";
import styles from "./FilterSection.module.css";

const FilterSection = ({
  title,
  contentType,
  state,
  filterType,
  onChange,
  onClear,
}) => {
  let content = [];

  if (contentType === "category") {
    content = state;
  } else if (contentType === "condition") {
    content = filterConditionContent;
  } else if (contentType === "price") {
    content = filterPriceContent;
  }

  return (
    <div
      className={styles.filter_sec}
      style={{ borderColor: colors.black[50] }}
    >
      <div className={styles.filter_sec__header}>
        <p style={{ color: colors.black[100] }}>{title}</p>
        <button
          name="Clear Section Filter"
          style={{ color: colors.black[70] }}
          onClick={() => onClear(contentType)}
        >
          Clear
        </button>
      </div>
      <div className={styles.filter_sec__content}>
        {content.length === 0 ? (
          <Skeleton
            bgColor={colors.black[80]}
            number={7}
            height="200px"
            width="100%"
            fullwidth
          />
        ) : (
          content.map((elm, index) => (
            <div
              key={index}
              className={[styles.filter_sec__line, `st_${filterType}`].join(
                " "
              )}
            >
              <input
                type={filterType}
                id={elm.id}
                name={contentType}
                onChange={(e) => onChange(e, index)}
                value={contentType === "category" ? elm.id : elm.value}
                checked={
                  contentType === "price"
                    ? state === elm.value
                    : contentType === "category"
                    ? elm.checked
                    : state[index]
                }
              />
              <div>
                {filterType === "checkbox" && (
                  <Check fill={colors.white[100]} width="9" height="8" />
                )}
              </div>
              <label htmlFor={elm.id} style={{ color: colors.black[90] }}>
                {elm.value}
              </label>
            </div>
          ))
        )}
      </div>
      <div className={styles.filter_sec__products}></div>
    </div>
  );
};

export default memo(FilterSection);
