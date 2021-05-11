import { colors } from "@/styles/theme";
import Link from "next/link";
import styles from "./BottomFooter.module.css";

const BottomFooter = () => {
  return (
    <div
      className={styles.bottom_footer}
      style={{ backgroundColor: colors.violet[90] }}
    >
      <div className="container">
        <div className={styles.bottom_footer__content}>
          <div>
            <ul>
              <li>
                <Link href="#">
                  <a>Terms of Services</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <span>Copyright © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
