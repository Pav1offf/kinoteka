export const translation = (job) => {
  if (job === "ACTOR") return "Актер";
  else if (job === "HIMSELF") return "Актер: играет самого себя";
  else if (job === "HERSELF") return "Актриса: играет саму себя";
  else if (job === "HRONO_TITR_MALE") return "Актер: в титрах не указан";
  else if (job === "HRONO_TITR_FEMALE") return "Актриса: в титрах не указана";
  else if (job === "PRODUCER") return "Продюсер";
  else if (job === "DIRECTOR") return "Режиссер";
  else if (job === "WRITER") return "Сценарист";
  else if (job === "COMPOSER") return "Композитор";
  else if (job === "EDITOR") return "Монтажер";
  else if (job === "OPERATOR") return "Оператор";
  else if (job === "DESIGN") return "Художник";
};
