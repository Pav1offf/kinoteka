import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Playlist = ({ value, list, title }) => {
  const navigate = useNavigate();

  const navigateToGenre = (value) => {
    navigate(`/lists/movies/${list}/${value}`);
  };

  return (
    <a className={styles.link} onClick={() => navigateToGenre(value)}>
      <div className={styles.image}>
        <img src="/250top.png" alt="250top" />
      </div>
      <div>
        <h2>{title}</h2>
      </div>
    </a>
  );
};

export default Playlist;
