import Form from "../../components/Form/Form";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setUser } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { InputsType } from "../../@types/IForm";

const SignUp = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const signUp = ({ email, password }: InputsType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user: { email, uid } }) => {
        dispatch(
          setUser({
            email,
            uid,
          })
        );
        navigate("/home");
      })
      .catch((error) => setError(error));
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

export default SignUp;
