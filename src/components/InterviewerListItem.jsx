import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//displays each interviewer in list when time slot is selected
export default function InterviewerListItem(props) {
  let interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
