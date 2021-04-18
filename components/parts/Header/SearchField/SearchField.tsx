import { InputSearch } from "@/components/UI/Inputs/Inputs";
import { colors } from "@/styles/theme";
import { useCallback, useRef, useState } from "react";
import styles from "./SearchField.module.css";
import { useRouter } from "next/router";
import { IconButton } from "@/components/UI/Button/Button";
import { Close, Search } from "@/styles/icons";

const SearchField = () => {
  const searchMenuRef = useRef(null);

  const { push: routerPush } = useRouter();

  const [searchDisabled, setSearchDisabled] = useState(true);

  const onTypingSearchHandler = useCallback((e) => {
    const searchValue = e?.target.value || "";
    searchValue ? setSearchDisabled(false) : setSearchDisabled(true);
  }, []);

  const onSubmitSearchHandler = useCallback((e) => {
    e.preventDefault();
    routerPush(`search?s=${e?.target[0].value}`);
  }, []);

  const onToggleSearchMenuHandler = useCallback(() => {
    searchMenuRef?.current?.classList.contains(styles["search_field--active"])
      ? searchMenuRef?.current?.classList.remove(styles["search_field--active"])
      : searchMenuRef?.current?.classList.add(styles["search_field--active"]);
  }, []);

  return (
    <div className={styles.search_container}>
      <IconButton
        name="Search"
        size="lg"
        bgColor={colors.white[90]}
        borderColor="transparent"
        className={styles.search_container__icon}
        onClick={onToggleSearchMenuHandler}
      >
        <Search height="20" width="20" fill={colors.white[100]} />
      </IconButton>
      <div
        className={styles.search_field}
        style={{ backgroundColor: colors.violet[100] }}
        ref={searchMenuRef}
      >
        <IconButton
          name="Close Search"
          size="lg"
          bgColor="transparent"
          className={styles.search_field__close}
          onClick={onToggleSearchMenuHandler}
        >
          <Close width="20" height="20" fill={colors.white[100]} />
        </IconButton>
        <InputSearch
          bgColor={colors.white[90]}
          borderColor="transparent"
          height="40px"
          color={colors.white[100]}
          placeholder="What are you looking for?"
          disabled={searchDisabled}
          onInput={onTypingSearchHandler}
          onSubmit={onSubmitSearchHandler}
        />
      </div>
    </div>
  );
};

export default SearchField;
