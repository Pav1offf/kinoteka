import { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const JobPerson = ({ staff, job }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.header} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <span>{job.Text}</span>
      <span>
        {staff
          .filter(
            (item) => item.professionKey === job.Key && item.nameRu.length > 0
          )
          .slice(0, 3)
          .map((item, index, array) => {
            return (
              <a key={index} onClick={() => navigateToPerson(item.staffId)}>
                {item.nameRu}
                {index < array.length - 1 && ", "}
              </a>
            );
          })}
      </span>
    </div>
  );
};

export default JobPerson;
