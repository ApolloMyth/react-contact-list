import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.outer} />
      <div className={styles.middle} />
      <div className={styles.inner} />
    </div>
  );
};

export default Loader;
