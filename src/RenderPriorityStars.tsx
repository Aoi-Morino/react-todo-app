import { textPrColor, textPrColorIsDone } from "./PrColorMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as starSolid
} from '@fortawesome/free-solid-svg-icons';
import {
  faStar as starRegular
} from '@fortawesome/free-regular-svg-icons';
// import { twMerge } from "tailwind-merge";
// import { text } from "@fortawesome/fontawesome-svg-core";

const renderPriorityStars = (priority: number, isDone: boolean) => {
  const totalStars = 3;

  return (Array.from({ length: totalStars }).map((_, index) => {
    const isActive = index < priority;
    return (
      <FontAwesomeIcon
        key={index}
        icon={isActive ? starSolid : starRegular}
        className={
          isDone ? textPrColorIsDone[priority] || "" : textPrColor[priority] || ""
        }
      />
    );
  })
);}

export default renderPriorityStars;