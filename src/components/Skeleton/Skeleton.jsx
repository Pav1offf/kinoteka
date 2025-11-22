import styles from "./styles.module.css";
const Skeleton = () => {
  return (
    <>
      {[...Array(20)].map((_, index) => {
        return <li key={index} className={styles.item}></li>;
      })}
    </>
  );
};

export default Skeleton;
