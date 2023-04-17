import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { Logo } from "./Logo";
import { useAuth } from "../../hooks";
import styles from "./Header.module.scss";
import { LogIn, LogOut } from "./LogInOut";
import { AddAContact } from "./AddAContact";
import { SearchPanel } from "./SearchPanel";

export const Header = () => {
  const auth = useAuth();
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={clsx(styles.item, styles.logo)}>
        <Logo />
      </div>
      <div className={clsx(styles.item, styles.search)}>
        {pathname !== "/login" && pathname !== "/register" && <SearchPanel />}
      </div>

      {auth.isAuth && (
        <div className={clsx(styles.item, styles.button)}>
          <AddAContact />
        </div>
      )}
      {auth.isAuth ? (
        <div className={clsx(styles.item, styles.auth)}>
          <LogOut />
        </div>
      ) : (
        <div className={clsx(styles.item, styles.auth)}>
          <LogIn />
        </div>
      )}
    </header>
  );
};
