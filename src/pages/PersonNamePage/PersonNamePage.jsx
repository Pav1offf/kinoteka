import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getPerson } from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonUp from "../../components/ButtonUp/ButtonUp";

const PersonNamePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { personId } = useParams();
  const [person, setPerson] = useState([]);
  const [profession, setProfession] = useState("ACTOR");

  const fetchPerson = async (personId) => {
    try {
      const response = await getPerson(personId);
      setPerson(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerson(personId);
  }, [personId]);

  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/movie/${id}`);
  };

  function ratingColor(rating) {
    if (rating >= 7) {
      return styles.ratingGreen;
    } else if (rating > 5) {
      return styles.ratingOrange;
    } else if (rating < 5) {
      return styles.ratingRed;
    }
  }

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header />
      <main className={`${theme === "light" ? styles.dark : styles.light}`}>
        <main className={styles.main}>
          <div className={styles.top}>
            <div className={styles.image}>
              <img src={person.posterUrl} alt="логан" />
            </div>
            <div className={styles.info}>
              <h2 className={styles.title}>{person.nameRu}</h2>
              <div style={{ padding: "20px 0" }}>
                <span className={styles.subtitle}>{person.nameEn}</span>
              </div>

              <h3>О персоне</h3>

              <div className={styles.params}>
                <div>
                  <span>Карьера</span>
                  <span>{person.profession}</span>
                </div>

                <div>
                  <span>Рост</span>
                  <span>{person.growth}см.</span>
                </div>

                <div>
                  <span>Возраст</span>
                  <span>{person.age} лет</span>
                </div>

                <div>
                  <span>Дата рождения</span>
                  <span>{person.birthday}</span>
                </div>

                <div>
                  <span>Место рождения</span>
                  <span>{person.birthplace}</span>
                </div>

                <div>
                  <span>{person.sex === "MALE" ? "Супруга" : "Супруг"}</span>
                  <span className={styles.spouses}>
                    {person.spouses?.map((item, index) => {
                      return (
                        <>
                          <a key={index}>
                            {`${item.name} ${item.divorcedReason}`}
                          </a>
                          <span>{item.children} детей</span>
                        </>
                      );
                    })}
                  </span>
                </div>

                <div>
                  <span>Всего фильмов</span>
                  <span>
                    {
                      person.films?.filter(
                        (obj, index, self) =>
                          index ===
                          self.findIndex((t) => t.filmId === obj.filmId)
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.actors}>
                <h3 className={styles.actorsTitle}>Лучшие фильмы</h3>
                {person.films
                  ?.filter(
                    (obj, index, self) =>
                      index === self.findIndex((t) => t.filmId === obj.filmId)
                  )
                  .filter((item) => item.rating >= 7)
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 10)
                  .map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={styles.actor}
                        onClick={() => navigateTo(item.filmId)}
                      >
                        {item.nameRu}
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={styles.facts}>
            <h3>Факты о персоне</h3>
            <ul className={styles.list}>
              {person.facts?.map((item, index) => {
                return (
                  <li key={index} className={styles.listItem}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.personFilms}>
            <nav>
              <div
                className={`${styles.btn} ${
                  profession === "ACTOR" ? styles.btnActive : ""
                }`}
                onClick={() => setProfession("ACTOR")}
              >
                <h3>Актер</h3>
                <span>
                  {person.films
                    ?.filter((item) => item.professionKey === "ACTOR")
                    ?.filter(
                      (obj, index, self) =>
                        index === self.findIndex((t) => t.filmId === obj.filmId)
                    ).length + " фильмов"}
                </span>
              </div>
              <div
                className={`${styles.btn} ${
                  profession === "PRODUCER" ? styles.btnActive : ""
                }`}
                onClick={() => setProfession("PRODUCER")}
              >
                <h3>Продюсер</h3>
                <span>
                  {person.films
                    ?.filter((item) => item.professionKey === "PRODUCER")
                    ?.filter(
                      (obj, index, self) =>
                        index === self.findIndex((t) => t.filmId === obj.filmId)
                    ).length + " фильмов"}
                </span>
              </div>
              <div
                className={`${styles.btn} ${
                  profession === "DIRECTOR" ? styles.btnActive : ""
                }`}
                onClick={() => setProfession("DIRECTOR")}
              >
                <h3>Режиссёр</h3>
                <span>
                  {person.films
                    ?.filter((item) => item.professionKey === "DIRECTOR")
                    ?.filter(
                      (obj, index, self) =>
                        index === self.findIndex((t) => t.filmId === obj.filmId)
                    ).length + " фильмов"}
                </span>
              </div>
            </nav>
            <ul className={styles.listFilms}>
              {person.films
                ?.filter((item) => item.professionKey === profession)
                ?.filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.filmId === obj.filmId)
                )
                .sort((a, b) => b.rating - a.rating)
                ?.map((item, index) => {
                  return (
                    <li key={index}>
                      <div
                        className={styles.personFilm}
                        onClick={() => navigateTo(item.filmId)}
                      >
                        <div>
                          <h3>{item.nameRu}</h3>
                          <p>{item.nameEn}</p>
                        </div>
                        <div>
                          <div className={ratingColor(item.rating)}>
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <ButtonUp />
        </main>
      </main>
    </div>
  );
};

export default PersonNamePage;
