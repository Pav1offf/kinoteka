import { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div
      className={`${styles.pagination} ${
        theme === "light" ? styles.dark : styles.light
      }`}
    >
      <button
        onClick={handlePreviousPage}
        disabled={currentPage <= 1}
        className={styles.arrow}
      >
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              onClick={() => handlePageNumber(index + 1)}
              className={styles.pageNumber}
              disabled={index + 1 === currentPage}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={styles.arrow}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
