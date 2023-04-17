import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { LogOut as LogOutIcon } from "@styled-icons/evaicons-solid";

import { useAppDispatch } from "../../../hooks";
import { removeUser } from "../../../redux/slices/authSlice";
import { removeContacts } from "../../../redux/slices/contactsSlice";

export const LogOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => alert(error));
    dispatch(removeUser());
    dispatch(removeContacts());
  };
  return (
    <div className={"logInOut"} onClick={() => onLogOut()}>
      <p>Log Out</p>
      <LogOutIcon className={"icon"} />
    </div>
  );
};
