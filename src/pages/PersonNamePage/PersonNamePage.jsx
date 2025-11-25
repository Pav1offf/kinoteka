import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getPerson } from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const PersonNamePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { personId } = useParams();
  const [person, setPerson] = useState([]);

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

  const navigateToYear = () => {
    navigate(`/lists/movies/${movie.year}`);
  };

  const navigateTo = (id) => {
    navigate(`/movie/${id}`);
  };

  const navigateToGenre = (genre) => {
    navigate(`/lists/movies/genre/${genre}`);
  };

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header />
      <main className={`${theme === "light" ? styles.dark : styles.light}`}>
        <main className={styles.main}>
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
                <span>Супруга</span>
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
                        index === self.findIndex((t) => t.filmId === obj.filmId)
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
        </main>
      </main>
    </div>
  );
};

export default PersonNamePage;
