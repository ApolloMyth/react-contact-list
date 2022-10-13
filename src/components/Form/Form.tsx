import styles from "./Form.module.scss";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm, InputsType } from "../../@types/IForm";
import { Link } from "react-router-dom";

const Form: FC<IForm> = ({
  title,
  isSignUp,
  buttonText,
  singInAndUp,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const onSign: SubmitHandler<InputsType> = (data) => singInAndUp(data);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSign)} className={styles.form}>
        <h2>{title}</h2>
        <input
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+\.\S+$/gi,
          })}
          placeholder={"Email"}
        />
        <input
          {...register("password", {
            required: true,
            minLength: isSignUp ? 8 : undefined,
            maxLength: isSignUp ? 20 : undefined,
          })}
          placeholder={"Password"}
          type={"password"}
        />
        <button className={"button"}>{buttonText}</button>
        <div className={styles.errors}>
          {isSignUp &&
            (errors?.password?.type === "minLength" ||
              errors?.password?.type === "maxLength") && (
              <p>
                The password cannot be shorter than 8 characters or longer than
                20 characters.
              </p>
            )}
          {errors?.email?.type === "pattern" && (
            <p>Please enter a valid Email</p>
          )}
          {(errors?.email?.type === "required" ||
            errors?.password?.type === "required") && (
            <p>The fields are required</p>
          )}
          {error && <p>Wrong Email or Password</p>}
        </div>
        {isSignUp ? (
          <div className={styles.links}>
            <div>Already have an account?</div>
            <Link to={"/login"}>Log In</Link>
          </div>
        ) : (
          <div className={styles.links}>
            <div>Dont have an account yet?</div>
            <Link to={"/register"}>Create one</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
