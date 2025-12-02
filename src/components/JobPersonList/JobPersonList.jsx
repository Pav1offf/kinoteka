import { memo, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import JobPerson from "../JobPerson/JobPerson";

const JobPersonList = ({ staff, handleMouseEnter, setIsOpen }) => {
  const jobs = [
    {
      Key: "DIRECTOR",
      Text: "Режиссер",
    },
    {
      Key: "WRITER",
      Text: "Сценарий",
    },
    {
      Key: "PRODUCER",
      Text: "Продюсер",
    },
    {
      Key: "OPERATOR",
      Text: "Оператор",
    },
    {
      Key: "COMPOSER",
      Text: "Композитор",
    },
    {
      Key: "DESIGN",
      Text: "Художник",
    },
    {
      Key: "EDITOR",
      Text: "Монтаж",
    },
  ];

  return (
    <>
      {jobs.map((job, index) => {
        return (
          <JobPerson
            staff={staff}
            key={index}
            job={job}
            handleMouseEnter={handleMouseEnter}
            setIsOpen={setIsOpen}
          />
        );
      })}
    </>
  );
};

export default memo(JobPersonList);
