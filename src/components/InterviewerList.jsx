import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props){
  const interViewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.onChange(interviewer.id)}></InterviewerListItem>
   
    );
  });
  return (<section className="interviewers">
          <h4 className="interviewers__header text--light">Interviewers</h4>
          <ul className="interviewers__list">{interViewers}</ul>
        </section>)
}