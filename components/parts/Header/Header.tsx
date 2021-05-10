import styles from "./Header.module.css";
import { Arrow, Logo, Menu, User } from "@/styles/icons";
import { colors } from "@/styles/theme";
import Favs from "./Favs/Favs";
import { Button, IconButton } from "@/components/UI/Button/Button";
import SearchField from "./SearchField/SearchField";
import Link from "next/link";
import Cart from "./Cart/Cart";
import SubHeader from "./SubHeader/SubHeader";
import { useCallback, useRef } from "react";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { useAuth } from "@/utils/useAuth";
import { useRouter } from "next/router";

const Header = () => {
  const { user, isLoading, signout, signin } = useAuth();

  const { reload, push: routerPush } = useRouter();

  const navMenuRef = useRef(null);

  const onToggleNavMenuHandler = useCallback((e) => {
    navMenuRef?.current?.classList.contains(styles["main_header__nav--active"])
      ? navMenuRef?.current?.classList.remove(
          styles["main_header__nav--active"]
        )
      : navMenuRef?.current?.classList.add(styles["main_header__nav--active"]);
  }, []);

  const onCloseNavMenuHandler = useCallback((e) => {
    if (
      !e.target.closest("#main_header__nav_content") ||
      e.target.closest("#main_header__nav_close")
    )
      navMenuRef?.current?.classList.contains(
        styles["main_header__nav--active"]
      ) &&
        navMenuRef?.current?.classList.remove(
          styles["main_header__nav--active"]
        );
  }, []);

  const onAuthHandler = useCallback(
    async (type) => {
      if (user && type !== "profile") {
        await signout().then(() => {
          reload();
        });
      } else if (user && type === "profile") {
        routerPush("/profile");
      } else {
        await signin();
      }
    },
    [user]
  );

  return (
    <>
      <header
        className={styles.main_header}
        style={{ backgroundColor: colors.violet[100] }}
      >
        <div className="container">
          <div className={styles.main_header__content}>
            <div
              className={styles.main_header__nav}
              ref={navMenuRef}
              onClick={onCloseNavMenuHandler}
            >
              <div
                className={styles.main_header__nav_content}
                id="main_header__nav_content"
                style={{ backgroundColor: colors.white[100] }}
              >
                <Button
                  name="Back Home"
                  id="main_header__nav_close"
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
                <ul style={{ color: colors.black[90] }}>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products">
                      <a>All Products</a>
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link href="/profile">
                        <a>My Profile</a>
                      </Link>
                    </li>
                  )}
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => onAuthHandler("sign")}
                  >
                    {user ? "Sign Out" : "Sign In"}
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.main_header__logo}>
              <IconButton
                name="Menu List"
                size="md"
                bgColor="transparent"
                mr="15px"
                onClick={onToggleNavMenuHandler}
              >
                <Menu height="18" width="18" fill={colors.white[100]} />
              </IconButton>
              <Link href="/">
                <a aria-label="Stockary">
                  <Logo height="30" width="120" fill={colors.white[100]} />
                </a>
              </Link>
            </div>
            <SearchField />
            <div className={styles.main_header__ctas}>
              {isLoading && !user ? (
                <Skeleton height="42px" width="240px" number={2} />
              ) : (
                <>
                  <Favs />
                  <Cart />
                  <Button
                    name="Profile"
                    size="sm"
                    bgColor={colors.blue[100]}
                    borderColor="transparent"
                    color={colors.white[100]}
                    ml="15px"
                    className={styles.main_header__cta_profile}
                    onClick={() => onAuthHandler("profile")}
                  >
                    <User
                      width="23px"
                      height="23px"
                      fill={colors.white[100]}
                      userPhoto={user ? user?.photo : ""}
                    />{" "}
                    My Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <SubHeader />
    </>
  );
};

export default Header;
