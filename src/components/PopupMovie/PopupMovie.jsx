import { memo } from "react";
import styles from "./styles.module.css";

const PopupMovie = ({ movie, closeModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={() => closeModal()}>
      <div className={styles.modalContent}>
        <iframe
          src={`https://ddbb.lol?id=${movie.kinopoiskId}&n=0/`}
          width="600"
          height="400"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="M2 frkp site player"
        ></iframe>
      </div>
    </div>
  );
};

export default memo(PopupMovie);
