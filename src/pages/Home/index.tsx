import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../../firebase";
import { Contact } from "../../@types";
import styles from "./Home.module.scss";
import { ContactItem } from "../../components";
import { setContacts } from "../../redux/slices/contactsSlice";
import { useAuth, useAppSelector, useAppDispatch } from "../../hooks";

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-emoji-frown"
    viewBox="0 0 16 16"
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
  </svg>
);

export const Home = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.authSlice);
  const { searchList } = useAppSelector((state) => state.contactsSlice);

  useEffect(() => {
    if (isAuth) {
      const colRef = query(collection(db, `users/${uid}/contacts`));
      onSnapshot(colRef, (snapshot) => {
        const contacts: Contact[] = [];
        snapshot.forEach((doc) => {
          contacts.push({
            name: doc.data().name,
            phone: doc.data().phone,
            email: doc.data().email,
            id: doc.id,
          });
        });
        dispatch(setContacts(contacts));
      });
    } else navigate("/login");
  }, [isAuth, navigate]);

  return (
    <section className={styles.home}>
      <div className={styles.contacts}>
        {searchList?.length === 0 ? (
          <div className={styles.nocontact}>
            {svg}
            <p>No contacts</p>
          </div>
        ) : (
          searchList?.map((contact) => (
            <ContactItem {...contact} key={contact.id} />
          ))
        )}
      </div>
    </section>
  );
};
