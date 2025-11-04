import styles from "./styles.module.css";

const Search = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.search}>
      <input
        onChange={(e) => setKeywords(e.target.value)}
        className={styles.input}
        type="text"
        value={keywords}
        placeholder="Название фильма"
      />
    </div>
  );
};

export default Search;
