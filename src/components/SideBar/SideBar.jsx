import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { genres } from "../../api/genres";
import { countries } from "../../api/countries";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const SideBar = () => {
  const { theme } = useContext(ThemeContext);
  const { isOpen } = useContext(ThemeContext);
  const navigate = useNavigate();

  const navigateToLists = () => {
    navigate(`/lists/movies`);
  };

  return (
    <div
      className={`${styles.sideBar} ${isOpen ? styles.sidebarOpen : ""} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <button className={styles.listButton} onClick={() => navigateToLists()}>
        Списки
      </button>
      <select name="country">
        <option value={"all"}>{"Все страны"}</option>
        {countries.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <select name="genre">
        <option value={"all"}>{"Все жанры"}</option>
        {genres.map((item) => {
          return <option value={item.genre}>{item.genre}</option>;
        })}
      </select>
    </div>
  );
};

export default SideBar;
