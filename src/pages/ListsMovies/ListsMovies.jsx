import styles from "./styles.module.css";
import Header from "../../components/Header/Header";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Playlist from "../../components/Playlist/Playlist";
import { genres } from "../../api/genres";
import { countries } from "../../api/countries";
import { collections } from "../../api/collections";

const ListsMovies = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [keywords, setKeywords] = useState("");
  const [playlist, setPlaylist] = useState("Коллекции");

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Списки</h1>
        <nav className={styles.lists}>
          <ul>
            <li>
              <button
                onClick={() => setPlaylist("Коллекции")}
                className={
                  playlist === "Коллекции" ? styles.active : styles.item
                }
              >
                Коллекции
              </button>
            </li>
            <li>
              <button
                onClick={() => setPlaylist("Жанры")}
                className={playlist === "Жанры" ? styles.active : styles.item}
              >
                Жанры
              </button>
            </li>
            <li>
              <button
                onClick={() => setPlaylist("Страны")}
                className={playlist === "Страны" ? styles.active : styles.item}
              >
                Страны
              </button>
            </li>
            <li>
              <button
                onClick={() => setPlaylist("Годы")}
                className={playlist === "Годы" ? styles.active : styles.item}
              >
                Годы
              </button>
            </li>
          </ul>
        </nav>
        <div>
          {playlist === "Коллекции"
            ? collections.map((item, index) => {
                return (
                  <Playlist
                    value={item.link}
                    title={item.title}
                    key={index}
                    list={"collection"}
                  />
                );
              })
            : null}

          {playlist === "Жанры"
            ? genres.map((item, index) => {
                return (
                  <Playlist
                    value={item.genre}
                    title={item.title}
                    key={index}
                    list={"genre"}
                  />
                );
              })
            : null}

          {playlist === "Годы"
            ? Array.from({ length: 6 }).map((_, index) => {
                return (
                  <Playlist
                    value={2025 - index}
                    title={2025 - index}
                    key={index}
                    list={"year"}
                  />
                );
              })
            : null}
          {playlist === "Годы"
            ? Array.from({ length: 15 }).map((_, index) => {
                return (
                  <Playlist
                    value={`${2010 - index * 10}-${2020 - index * 10 - 1}`}
                    title={`${2010 - index * 10}-${2020 - index * 10 - 1}`}
                    key={index}
                    list={"year"}
                  />
                );
              })
            : null}

          {playlist === "Страны"
            ? countries.map((item, index) => {
                return (
                  <Playlist
                    value={item.country}
                    title={item.country}
                    key={index}
                    list={"country"}
                  />
                );
              })
            : null}
        </div>
      </main>
    </div>
  );
};

export default ListsMovies;
