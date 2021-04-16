import { IconButton } from "@/components/UI/Button/Button";
import { Facebook, Logo, Twitter, Youtube } from "@/styles/icons";
import { colors } from "@/styles/theme";
import Link from "next/link";
import BottomFooter from "./BottomFooter/BottomFooter";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div
        className={styles.footer}
        style={{ backgroundColor: colors.violet[100] }}
      >
        <div className="container">
          <div className={styles.footer_content}>
            <div className={styles.footer__section}>
              <div className={styles.footer__logo}>
                <Link href="#">
                  <a>
                    <Logo height="30" width="120" fill={colors.white[100]} />
                  </a>
                </Link>
              </div>
              <div className={styles.footer__text}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
              </div>
              <div className={styles.footer__text}>
                <ul className={styles.footer__social}>
                  <li>
                    <IconButton
                      size="lg"
                      bgColor={colors.white[90]}
                      borderColor="transparent"
                      name="Facebook"
                      link
                      href="#"
                      target="_blank"
                    >
                      <Facebook
                        fill={colors.white[100]}
                        width="9"
                        height="18"
                      />
                    </IconButton>
                  </li>
                  <li>
                    <IconButton
                      size="lg"
                      bgColor={colors.white[90]}
                      borderColor="transparent"
                      name="Twitter"
                      link
                      href="#"
                      target="_blank"
                    >
                      <Twitter
                        fill={colors.white[100]}
                        width="17"
                        height="15"
                      />
                    </IconButton>
                  </li>
                  <li>
                    <IconButton
                      size="lg"
                      bgColor={colors.white[90]}
                      borderColor="transparent"
                      name="Youtube"
                      link
                      href="#"
                      target="_blank"
                    >
                      <Youtube
                        fill={colors.white[100]}
                        width="17"
                        height="13"
                      />
                    </IconButton>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footer__section}>
              <div className={styles.footer__heading}>Company</div>
              <div className={styles.footer__text}>
                <Link href="#">
                  <a>About Us</a>
                </Link>
                <Link href="#">
                  <a>Our Story</a>
                </Link>
                <Link href="#">
                  <a>Our Process</a>
                </Link>
                <Link href="#">
                  <a>Contact Us</a>
                </Link>
              </div>
            </div>
            <div className={styles.footer__section}>
              <div className={styles.footer__heading}>Resources</div>
              <div className={styles.footer__text}>
                <Link href="#">
                  <a>Top Brands</a>
                </Link>
                <Link href="#">
                  <a>How To Sell</a>
                </Link>
                <Link href="#">
                  <a>How To Buy</a>
                </Link>
                <Link href="#">
                  <a>Support &amp; Help Center</a>
                </Link>
              </div>
            </div>
            <div className={styles.footer__section}>
              <div className={styles.footer__heading}>Stay Informed</div>
              <div className={styles.footer__text}></div>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter />
    </>
  );
};

export default Footer;
