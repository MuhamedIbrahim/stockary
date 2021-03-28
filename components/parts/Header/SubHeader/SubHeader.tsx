import { Button } from "@/components/UI/Button/Button";
import { MenuDots, Arrow, HeartFilled } from "@/styles/icons";
import { colors } from "@/styles/theme";
import fetcher from "@/utils/fetcher/categoriesFetcher";
import swrOptions from "@/utils/fetcher/options";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import useSWR from "swr";
import styles from "./SubHeader.module.css";

const SubHeader = () => {
  const { data: productsCategories = [] } = useSWR("all", fetcher, swrOptions);

  const navMenuRef = useRef(null);

  const onToggleNavMenuHandler = useCallback((e) => {
    navMenuRef?.current?.classList.contains(styles["sub_header__nav--active"])
      ? navMenuRef?.current?.classList.remove(styles["sub_header__nav--active"])
      : navMenuRef?.current?.classList.add(styles["sub_header__nav--active"]);
  }, []);

  const onCloseNavMenuHandler = useCallback((e) => {
    if (
      !e.target.closest("#sub_header__nav_content") ||
      e.target.closest("#sub_header__nav_close")
    )
      navMenuRef?.current?.classList.contains(
        styles["sub_header__nav--active"]
      ) &&
        navMenuRef?.current?.classList.remove(
          styles["sub_header__nav--active"]
        );
  }, []);

  return (
    <div
      className={styles.sub_header}
      style={{ borderColor: colors.black[50] }}
    >
      <div className="container">
        <div
          className={styles.sub_header__nav}
          ref={navMenuRef}
          onClick={onCloseNavMenuHandler}
        >
          <div
            className={styles.sub_header__nav_content}
            id="sub_header__nav_content"
            style={{ backgroundColor: colors.white[100] }}
          >
            <Button
              id="sub_header__nav_close"
              size="xs"
              bgColor="transparent"
              onClick={onToggleNavMenuHandler}
            >
              <Arrow
                width="15"
                height="8"
                fill={colors.black[100]}
                dir="-180"
              />
              Back
            </Button>
            <h4
              className={styles.sub_header__nav_title}
              style={{ color: colors.black[100] }}
            >
              Categories
            </h4>
            <div className={styles.sub_header__nav_all_products}>
              {productsCategories?.map((category) => (
                <div
                  key={category.id}
                  className={styles.sub_header__nav_product}
                >
                  <Link href={`/categories/${category.id}`}>
                    <a>
                      <div style={{ backgroundColor: colors.cyan[70] }}>
                        <Image
                          src={`/images/categories/${category.name
                            .split(" ")
                            .join("")}.png`}
                          alt={category.name}
                          width="55"
                          height="55"
                          objectFit="contain"
                        />
                      </div>
                      <div>
                        <p style={{ color: colors.black[100] }}>
                          {category.name}
                        </p>
                        <span style={{ color: colors.black[70] }}>
                          {category.products.length} Products
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ul style={{ color: colors.black[100] }}>
          <li onClick={onToggleNavMenuHandler} style={{ cursor: "pointer" }}>
            <MenuDots width="10" height="16" fill={colors.black[100]} />
            All Categories
          </li>
          {productsCategories
            ?.filter((_, index) => index < 7)
            .map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.id}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SubHeader;
