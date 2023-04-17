import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Form } from "../../components";
import { InputsType } from "../../@types";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../redux/slices/authSlice";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const singIn = ({ email, password }: InputsType) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user: { email, uid } }) => {
        dispatch(
          setUser({
            email,
            uid,
          })
        );
        setError("");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <Form
      title={"Sign in"}
      isSignUp={false}
      buttonText={"Sign in"}
      singInAndUp={singIn}
      error={error}
    />
  );
};
