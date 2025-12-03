import { memo } from "react";
import styles from "./styles.module.css";

const PersonParams = ({ person, isLoading }) => {
  return (
    <>
      <h3>О персоне</h3>
      <div className={styles.params}>
        <div>
          <span>Карьера</span>
          <span>{person.profession ? person.profession : "—"}</span>
        </div>

        <div>
          <span>Рост</span>
          <span>{person.growth ? person.growth + ".см" : "—"}</span>
        </div>

        <div>
          <span>Возраст</span>
          <span>{person.age ? person.age + "лет" : "—"}</span>
        </div>

        <div>
          <span>Дата рождения</span>
          <span>{person.birthday ? person.birthday : "—"}</span>
        </div>

        <div>
          <span>Место рождения</span>
          <span>{person.birthplace ? person.birthplace : "—"}</span>
        </div>

        <div>
          <span>{person.sex === "MALE" ? "Супруга" : "Супруг"}</span>
          <span className={styles.spouses}>
            {person.spouses?.map((item, index) => {
              return (
                <a key={index}>
                  {`${item.name} ${item.divorcedReason}`}
                  <span>{item.children} детей</span>
                </a>
              );
            })}
          </span>
        </div>

        <div>
          <span>Всего фильмов</span>
          <span>
            {
              person.films?.filter(
                (obj, index, self) =>
                  index === self.findIndex((t) => t.filmId === obj.filmId)
              ).length
            }
          </span>
        </div>
      </div>
    </>
  );
};

export default memo(PersonParams);
