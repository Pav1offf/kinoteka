import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedKeywords !== "") navigate(`/search/${debouncedKeywords}`);
  }, [debouncedKeywords]);

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
