import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getMovie } from "../../api/apiMovie";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const fetchMovie = async (id) => {
    try {
      const response = await getMovie(id);
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <main className={styles.main}>
        <div className={styles.image}>
          <img src={product.posterUrlPreview} alt="логан" />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{product.nameRu}</h3>
          <p>{product.description}</p>
        </div>
      </main>
    </div>
  );
};

export default Movie;
