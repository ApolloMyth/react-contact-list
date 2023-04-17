import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.outer} />
      <div className={styles.middle} />
      <div className={styles.inner} />
    </div>
  );
};
