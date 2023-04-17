import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { Form } from "../../components";
import { InputsType } from "../../@types";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../redux/slices/authSlice";

export const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const signUp = ({ email, password }: InputsType) => {
    createUserWithEmailAndPassword(auth, email, password)
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
      title={"Create Your Account"}
      isSignUp={true}
      buttonText={"Sign Up"}
      singInAndUp={signUp}
      error={error}
    />
  );
};
