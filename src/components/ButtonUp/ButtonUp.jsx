import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Для плавной прокрутки
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={styles.buttonUp}
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <img src="/arrow-up.png" alt="Наверх" />
    </button>
  );
};

export default ButtonUp;
