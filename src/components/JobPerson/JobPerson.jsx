import { memo, useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const JobPerson = ({ staff, job, handleMouseEnter, setIsOpen }) => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const navigateToPerson = (personId) => {
    navigate(`/name/${personId}`);
  };

  return (
    <div
      className={`${styles.header} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <span>{job.Text}</span>

      <span>
        {staff.filter(
          (item) => item.professionKey === job.Key && item.nameRu.length > 0
        ).length > 0
          ? staff
              .filter(
                (item) =>
                  item.professionKey === job.Key && item.nameRu.length > 0
              )
              .slice(0, 3)
              .map((item, index, array) => {
                return (
                  <a
                    key={index}
                    onClick={() => navigateToPerson(item.staffId)}
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    {item.nameRu}
                    {index < array.length - 1 && ", "}
                  </a>
                );
              })
          : "—"}
      </span>
    </div>
  );
};

export default memo(JobPerson);
