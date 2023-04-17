import { Link } from "react-router-dom";
import { LogIn as LogInIcon } from "@styled-icons/evaicons-solid";

export const LogIn = () => {
  return (
    <Link to={"/login"}>
      <div className={"logInOut"}>
        <p>Log In</p>
        <LogInIcon className={"icon"} />
      </div>
    </Link>
  );
};
