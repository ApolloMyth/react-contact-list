import { Link } from "react-router-dom";

import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link to={"/home"}>
      <div className={styles.logo}>
        <h1>Contact list</h1>
      </div>
    </Link>
  );
};
