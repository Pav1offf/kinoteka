import { memo, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { translation } from "../../helpers/translation";

const PersonFilmsList = ({ person, isLoading }) => {
  const [profession, setProfession] = useState("ACTOR");

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

  const personJob = person.films?.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.professionKey === obj.professionKey)
  );

  return (
    <div className={styles.personFilms}>
      <nav>
        {personJob?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.btn} ${
                profession === item.professionKey ? styles.btnActive : ""
              }`}
              onClick={() => setProfession(item.professionKey)}
            >
              <h3>{translation(item.professionKey)}</h3>
              <span>
                {person.films
                  ?.filter(
                    (item) =>
                      item.professionKey === personJob[index].professionKey
                  )
                  ?.filter(
                    (obj, index, self) =>
                      index === self.findIndex((t) => t.filmId === obj.filmId)
                  ).length + " фильмов"}
              </span>
            </div>
          );
        })}
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
  );
};

export default memo(PersonFilmsList);
