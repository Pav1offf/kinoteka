import { memo } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const PersonInfoRight = ({ person, isLoading }) => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
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
  );
};

export default memo(PersonInfoRight);
