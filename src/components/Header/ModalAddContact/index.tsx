import { FC, useState } from "react";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

import { db } from "../../../firebase";
import { Contact } from "../../../@types";
import styles from "./ModalAddContact.module.scss";
import { useAppSelector } from "../../../hooks";

type ModalAddType = {
  title: string;
  contact?: Contact;
  setModal: (mode: boolean) => void;
};

export const ModalAddContact: FC<ModalAddType> = ({
  title,
  contact,
  setModal,
}) => {
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
  const { uid } = useAppSelector((state) => state.authSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAddAContact: SubmitHandler<Contact> = async (contactFields) => {
    setIsLoading(true);
    if (contact) {
      await updateDoc(doc(db, `users/${uid}/contacts/${contact.id}`), {
        ...contactFields,
      });
    } else {
      await addDoc(collection(db, `users/${uid}/contacts`), {
        ...contactFields,
      });
    }
    setModal(false);
    setIsLoading(false);
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
          <button className={"button"} disabled={isLoading}>
            {contact ? "Change" : "Add"}
          </button>
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
