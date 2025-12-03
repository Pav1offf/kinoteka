import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { genres } from "../../api/genres";
import { countries } from "../../api/countries";
import { memo, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const SideBar = ({
  selectedCountry,
  setSelectedCountry,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedSort,
  setSelectedSort,
  range,
  setRange,
}) => {
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

      <select
        name="sorting"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <option value={"RATING"}>{"По рейтингу"}</option>
        <option value={"NUM_VOTE"}>{"По количеству оценок"}</option>
        <option value={"YEAR"}>{"По дате"}</option>
      </select>

      <select
        name="countries"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value={""}>{"Все страны"}</option>
        {countries.map((item, i) => {
          return (
            <option value={item.id} key={i}>
              {item.country}
            </option>
          );
        })}
      </select>
      <select
        name="genres"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value={""}>{"Все жанры"}</option>
        {genres.map((item, i) => {
          return (
            <option value={item.id} key={i}>
              {item.genre}
            </option>
          );
        })}
      </select>
      <select
        name="years"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value={""}>{"Все годы"}</option>
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <option value={2025 - i} key={i}>
              {2025 - i}
            </option>
          );
        })}
        {Array.from({ length: 15 }).map((_, i) => {
          return (
            <option value={`${2010 - i * 10}-${2020 - i * 10 - 1}`} key={i}>
              {2010 - i * 10}-{2020 - i * 10 - 1}
            </option>
          );
        })}
      </select>
      {/* <p>Рейтинг</p> */}
      {/* <RangeSlider
        min={1}
        max={10}
        value={range}
        onInput={setRange} // Используйте onInput для обновления в реальном времени
      /> */}
    </div>
  );
};

export default memo(SideBar);
