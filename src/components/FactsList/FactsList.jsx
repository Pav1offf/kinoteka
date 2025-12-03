import { memo } from "react";
import styles from "./styles.module.css";

const FactsList = ({ person, isLoading }) => {
  return (
    <div className={styles.facts}>
      <h3>Факты о персоне</h3>
      <ul className={styles.list}>
        {person.facts?.map((item, index) => {
          return (
            <li key={index} className={styles.listItem}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(FactsList);
