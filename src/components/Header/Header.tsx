import styles from "./Header.module.scss";
import Logo from "./Logo/Logo";
import SearchPanel from "./SearchPanel/SearchPanel";
import { useAuth } from "../../hooks/useAuth";
import AddAContact from "./AddAContact/AddAContact";
import LogOut from "./LogInOut/LogOut";
import LogIn from "./LogInOut/LogIn";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const Header = () => {
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

export default Header;
