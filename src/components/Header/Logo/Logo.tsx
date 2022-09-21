import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/home"}>
      <div className={styles.logo}>
        <h1>Test Task</h1>
      </div>
    </Link>
  );
};

export default Logo;
