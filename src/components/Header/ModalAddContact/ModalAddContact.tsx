import styles from "./ModalAddContact.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import clsx from "clsx";
import { useAppDispatch } from "../../../hooks/redux";
import { Contact } from "../../../@types/IContacts";
import { v4 as uuidv4 } from "uuid";
import { addContact, changeContact } from "../../../redux/slices/contactsSlice";

type ModalAddType = {
  title: string;
  contact?: Contact;
  setModal: (mode: boolean) => void;
};

const ModalAddContact: FC<ModalAddType> = ({ title, contact, setModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues: {
      name: contact?.name || "",
      phone: contact?.phone || "",
      email: contact?.email || "",
    },
  });
  const dispatch = useAppDispatch();
  const onAddAContact: SubmitHandler<Contact> = (contactFields) => {
    if (contact) {
      dispatch(changeContact({ ...contactFields, id: contact.id }));
    } else {
      dispatch(addContact({ ...contactFields, id: uuidv4() }));
    }
    setModal(false);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onAddAContact)} className={styles.form}>
        <h2>{title}</h2>
        <label>
          <p>Name</p>
          <input
            {...register("name", {
              required: true,
              maxLength: 30,
            })}
            required
            placeholder={"Name"}
          />
        </label>

        <label>
          <p>Phone number</p>
          <input
            {...register("phone", {
              required: true,
              pattern: /^\+?[1-9][0-9]{7,14}$/gim,
            })}
            required
            placeholder={"+* *** ***-**-**"}
          />
        </label>

        <label>
          <p>Email</p>
          <input
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/gi,
            })}
            required
            placeholder={"example@gmail.com"}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={clsx(styles.cancel)}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button className={"button"}>{contact ? "Change" : "Add"}</button>
        </div>

        <div className={styles.errors}>
          {errors?.name?.type === "maxLength" && (
            <p className={styles.error}>Name cannot exceed 30 characters</p>
          )}
          {errors?.phone?.type === "pattern" && (
            <p className={styles.error}>Invalid phone number</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className={styles.error}>Invalid email</p>
          )}
          {(errors?.name?.type === "required" ||
            errors?.phone?.type === "required" ||
            errors?.email?.type === "required") && (
            <p>The fields are required</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModalAddContact;
