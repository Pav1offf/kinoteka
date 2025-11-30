import { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const PopupPerson = ({ person, coordinates }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.popupOverlay} ${
        theme === "light" ? styles.dark : styles.light
      }`}
      style={{ top: coordinates.y / 2, left: coordinates.x - 420 }}
    >
      <div className={styles.popupContent}>
        <a href="/name/797" className={styles.personPhoto}>
          <img src={person.posterUrl} alt="" />
        </a>
        <div>
          <h2>{person.nameRu}</h2>
          <p>{person.nameEn}</p>
          <p>{person.professionText.slice(0, -1)}</p>
        </div>
      </div>
    </div>
  );
};

export default PopupPerson;
