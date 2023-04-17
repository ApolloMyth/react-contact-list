import { FC, useState } from "react";

import styles from "./AddAContact.module.scss";
import { ModalAddContact } from "../ModalAddContact";

export const AddAContact: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className={styles.addAPhoto}>
      <button onClick={() => setModal(true)} className={styles.button}>
        Add a contact
      </button>
      {modal && (
        <ModalAddContact setModal={setModal} title={"Add a new contact"} />
      )}
    </div>
  );
};
