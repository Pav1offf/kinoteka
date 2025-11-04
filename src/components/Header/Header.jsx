import Search from "../Search/Search";
import styles from "./styles.module.css";

const Header = ({ keywords, setKeywords }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} alt="logo" />
        <h1 className={styles.title}>KINOTEKA</h1>
      </div>
      <Search keywords={keywords} setKeywords={setKeywords} />
    </header>
  );
};

export default Header;
