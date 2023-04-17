import { useEffect } from "react";
import clsx from "clsx";
import { Search, Close } from "@styled-icons/evaicons-solid";

import styles from "./SearchPanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setSearchLine } from "../../../redux/slices/contactsSlice";

export const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.contactsSlice);
  const onSetSearch = (e: string) => {
    dispatch(setSearchLine(e));
  };
  useEffect(() => {
    onSetSearch("");
  }, []);
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchPanel}>
        <Search className={styles.icon} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSetSearch(e.currentTarget.value)}
          placeholder={"Search by name"}
        />
        <Close
          onClick={() => onSetSearch("")}
          className={clsx(
            styles.icon,
            styles.close,
            search.length > 0 && styles.active
          )}
        />
      </div>
    </div>
  );
};
