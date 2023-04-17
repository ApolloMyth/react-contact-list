import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import { FC } from "react";

export const NotFound: FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.face}>
        <div className={styles.band}>
          <div className={styles.red} />
          <div className={styles.white} />
          <div className={styles.blue} />
        </div>
        <div className={styles.eyes} />
        <div className={styles.dimples} />
        <div className={styles.mouth} />
      </div>

      <h1 className={styles.title}>Oops! Something went wrong!</h1>
      <Link to={"/"}>
        <div className={styles.btn}>Return to Home</div>
      </Link>
    </div>
  );
};
