import React from "react";
import DayListItem from "./DayListItem";

//displays days on left panel
export default function DayList(props) {
  const jour = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        //the following are props
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      ></DayListItem>
    );
  });
  console.log(jour);
  return <ul>{jour}</ul>;
}
