import { LogOut as LogOutIcon } from "@styled-icons/ionicons-outline";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { removeUser } from "../../../redux/slices/authSlice";

const LogOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => alert(error));
    dispatch(removeUser());
  };
  return (
    <div className={"logInOut"} onClick={() => onLogOut()}>
      <p>Log Out</p>
      <LogOutIcon className={"icon"} />
    </div>
  );
};

export default LogOut;
