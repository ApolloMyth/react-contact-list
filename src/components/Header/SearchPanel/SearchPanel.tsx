import styles from "./SearchPanel.module.scss";
import { Search, Close } from "@styled-icons/evil";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setSearchLine } from "../../../redux/slices/contactsSlice";
import { useEffect } from "react";

const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.contactsSlice);
  const onSetSearch = (e: string) => {
    dispatch(setSearchLine(e));
  };
  useEffect(() => {
    onSetSearch("");
  }, []);
  console.log(search);
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

export default SearchPanel;
