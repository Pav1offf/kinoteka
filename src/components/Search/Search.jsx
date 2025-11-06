import { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const Search = ({ keywords, setKeywords }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`${styles.search} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <input
        onChange={(e) => setKeywords(e.target.value)}
        className={styles.input}
        type="text"
        value={keywords}
        placeholder="Название фильма"
      />
    </div>
  );
};

export default Search;
