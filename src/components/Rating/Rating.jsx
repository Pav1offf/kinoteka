import styles from "./styles.module.css";

const Rating = ({ rating, name }) => {
  function ratingColor(rating) {
    if (rating >= 7) {
      return styles.ratingGreen;
    } else if (rating > 5) {
      return styles.ratingOrange;
    } else if (rating < 5) {
      return styles.ratingRed;
    }
  }

  return <div className={ratingColor(rating)}>{name + rating}</div>;
};

export default Rating;
