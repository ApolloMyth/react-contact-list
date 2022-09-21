import { useState } from "react";
import Form from "../../components/Form/Form";
import { InputsType } from "../../@types/IForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        setError(false);
        navigate("/home");
      })
      .catch(() => setError(true));
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

export default SignIn;
