import { memo, useContext } from "react";
import { themeIcons } from "../../assets";
import Search from "../Search/Search";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/`);
  };

  return (
    <header
      className={`${styles.header} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <div onClick={() => navigateTo()} className={styles.left}>
        <div className={styles.logo} alt="logo" />
        <h1 className={styles.title}>KINOTEKA</h1>
      </div>
      <Search />
      <img
        src={theme === "light" ? themeIcons.light : themeIcons.dark}
        alt="theme"
        className={styles.theme}
        onClick={toggleTheme}
      />
    </header>
  );
};

export default memo(Header);
