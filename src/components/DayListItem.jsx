import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//displays number of spots remaining message
let displaySpots = function (spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining";
  } else {
    return `${spots} spots remaining`;
  }
};

//displays each day and spots remaining also has data-testid for testing
export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{displaySpots(props.spots)}</h3>
    </li>
  );
}
