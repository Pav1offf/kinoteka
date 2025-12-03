import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getPerson } from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonUp from "../../components/ButtonUp/ButtonUp";
import FactsList from "../../components/FactsList/FactsList";
import PersonFilmsList from "../../components/PersonFilmsList/PersonFilmsList";
import PersonInfoRight from "../../components/PersonInfoRight/PersonInfoRight";
import PersonParams from "../../components/PersonParams/PersonParams";

const PersonNamePage = () => {
  const { theme } = useContext(ThemeContext);
  const { personId } = useParams();
  const [person, setPerson] = useState([]);

  const fetchPerson = async (personId) => {
    try {
      const response = await getPerson(personId);
      setPerson(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerson(personId);
  }, [personId]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header />
      <main className={`${theme === "light" ? styles.dark : styles.light}`}>
        <main className={styles.main}>
          <div className={styles.top}>
            <div className={styles.image}>
              <img src={person.posterUrl} alt="логан" />
            </div>
            <div className={styles.info}>
              <h2 className={styles.title}>{person.nameRu}</h2>
              <div style={{ padding: "20px 0" }}>
                <span className={styles.subtitle}>{person.nameEn}</span>
              </div>

              <PersonParams person={person} />
            </div>

            <PersonInfoRight person={person} />
          </div>

          <FactsList person={person} />

          <PersonFilmsList person={person} />

          <ButtonUp />
        </main>
      </main>
    </div>
  );
};

export default PersonNamePage;
