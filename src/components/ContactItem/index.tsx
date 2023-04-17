import { FC, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { Edit, PersonDelete } from "@styled-icons/evaicons-solid";

import { db } from "../../firebase";
import { Contact } from "../../@types";
import { ModalAddContact } from "../Header";
import style from "./ContactItem.module.scss";
import { useAppSelector } from "../../hooks";

export const ContactItem: FC<Contact> = ({ name, email, phone, id }) => {
  const [modal, setModal] = useState<boolean>(false);
  const { uid } = useAppSelector((state) => state.authSlice);
  const deleteItem = async () => {
    await deleteDoc(doc(db, `users/${uid}/contacts/${id}`));
  };
  return (
    <div className={style.contact}>
      <div className={style.name}>{name}</div>
      <div className={style.phone}>{phone}</div>
      <div className={style.email}>{email}</div>
      <div className={style.buttons}>
        <button className={"icon"} onClick={() => setModal(true)}>
          <Edit />
        </button>
        <button className={"icon"} onClick={() => deleteItem()}>
          <PersonDelete />
        </button>
      </div>
      {modal && (
        <ModalAddContact
          setModal={setModal}
          title={"Change a contact"}
          contact={{ name, phone, email, id }}
        />
      )}
    </div>
  );
};
