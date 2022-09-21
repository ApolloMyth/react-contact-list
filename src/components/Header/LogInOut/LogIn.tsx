import { LogIn as LogInIcon } from "@styled-icons/ionicons-outline";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <Link to={"/login"}>
      <div className={"logInOut"}>
        <p>Log In</p>
        <LogInIcon className={"icon"} />
      </div>
    </Link>
  );
};

export default LogIn;
