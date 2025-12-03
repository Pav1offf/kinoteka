import { memo } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const MovieStarring = ({ staff, handleMouseEnter, setIsOpen, isLoading }) => {
  const navigate = useNavigate();

  const navigateToPerson = (personId) => {
    navigate(`/name/${personId}`);
  };

  return (
    <div className={styles.actors}>
      <h3 className={styles.actorsTitle}>В главных ролях:</h3>
      {staff
        .filter((item) => item.professionKey === "ACTOR")
        .slice(0, 10)
        .map((item, index) => {
          return (
            <div className={styles.actorInner} key={index}>
              <div className={styles.actorPhoto}>
                <img
                  className={styles.actorPhotoImg}
                  src={item.posterUrl}
                  alt=""
                />
              </div>

              <a
                key={index}
                className={styles.actor}
                onClick={() => navigateToPerson(item.staffId)}
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseLeave={() => setIsOpen(false)}
              >
                {item.nameRu}
                {` (${item.description})`}
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default memo(MovieStarring);
