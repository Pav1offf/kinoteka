import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getMovie } from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import Header from "../../components/Header/Header";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);

  function ratingColor(rating) {
    if (rating >= 7) {
      return styles.ratingGreen;
    } else if (rating > 5) {
      return styles.ratingOrange;
    } else if (rating < 5) {
      return styles.ratingRed;
    }
  }

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

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/lists/movies/${product.year}`);
  };

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={`${theme === "light" ? styles.dark : styles.light}`}>
        <main className={styles.main}>
          <div className={styles.image}>
            <img src={product.posterUrlPreview} alt="логан" />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>
              {product.nameRu}
              <span>{` (${product.year})`}</span>
            </h2>
            <div style={{ paddingTop: "10px" }}>
              <span className={styles.subtitle}>{product.nameOriginal}</span>
              <span className={styles.subtitle}>
                {" "}
                {product.ratingAgeLimits}+
              </span>
            </div>
            <p className={styles.desc}>{product.shortDescription}</p>

            <button className={styles.button}>Смотреть</button>

            <h3>О фильме</h3>

            <div className={styles.params}>
              <div>
                <span>Год производства</span>
                <span
                  onClick={() => navigateTo(product.year)}
                  className={styles.year}
                >
                  {product.year}
                </span>
              </div>

              <div>
                <span>Страна</span>
                {product.countries?.map((item, index, array) => {
                  return (
                    <span key={index}>
                      {item.country}
                      {index < array.length - 1 && ", "}{" "}
                    </span>
                  );
                })}
              </div>

              <div>
                <span>Жанр</span>
                <span>
                  {product.genres?.map((item, index, array) => {
                    return (
                      <span key={index}>
                        {item.genre}
                        {index < array.length - 1 && ", "}{" "}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.ratings}>
            {product.ratingImdb ? (
              <div className={ratingColor(product.ratingImdb)}>
                {product.ratingImdb} <span>Imdb</span>
              </div>
            ) : null}
            {product.ratingImdb ? (
              <span>{product.ratingImdbVoteCount} оценки</span>
            ) : null}

            {product.ratingKinopoisk ? (
              <div className={ratingColor(product.ratingKinopoisk)}>
                {product.ratingKinopoisk} <span>Кинопоиск</span>
              </div>
            ) : null}
            {product.ratingKinopoisk ? (
              <span>{product.ratingKinopoiskVoteCount} оценки</span>
            ) : null}
          </div>
        </main>
      </main>
    </div>
  );
};

export default Movie;
