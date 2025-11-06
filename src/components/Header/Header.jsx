import { useContext } from "react";
import { themeIcons } from "../../assets";
import Search from "../Search/Search";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const Header = ({ keywords, setKeywords }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`${styles.header} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.left}>
        <div className={styles.logo} alt="logo" />
        <h1 className={styles.title}>KINOTEKA</h1>
      </div>
      <Search keywords={keywords} setKeywords={setKeywords} />
      <img
        src={theme === "light" ? themeIcons.light : themeIcons.dark}
        alt="theme"
        className={styles.theme}
        onClick={toggleTheme}
      />
    </header>
  );
};

export default Header;
