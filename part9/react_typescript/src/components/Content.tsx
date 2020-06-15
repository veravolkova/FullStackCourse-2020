import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  parts: {
    name: string;
    exerciseCount?: number;
    exerciseSubmissionLink?: string;
    description?: string;
    groupProjectCount?: number;
  }[];
}

const Content: React.FC< {parts: CoursePart []} > = (props) => { 
  //const Content: React.FC< courseParts []: CoursePart > = (props) => { 

  const cont = props.parts.map((item, index) => (
    <p key={index}>
      <Part part={item} />
    </p>
  ));

 /*  const partsList = props.parts.map((part, index) => (
    <li key={index} style={{ listStyleType: "none" }}>
      {part.name}, {part.exerciseCount}
    </li>
  )); 
 */
  return (
    <div>
      {cont}
    </div>
  );
};
export default Content;




 
 