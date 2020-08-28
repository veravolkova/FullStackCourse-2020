import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  console.log(part.name);

  switch (part.name) {
    case "Fundamentals":
      return (
        <>
          <h4>{part.name}</h4>
          <ul>
            <li>Number of exercises: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>   
          </ul>   
        </>
      );
    case "Using props to pass data":        
      return (
        <>
          <h4>{part.name}</h4>
          <ul>
            <li>Number of exercises: {part.exerciseCount}</li>
            <li>Number of group projects: {part.groupProjectCount}</li>   
          </ul>   
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <h4>{part.name}</h4>
          <ul>
            <li>Number of exercises: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>
            <li>{part.exerciseSubmissionLink}</li>   
          </ul>      
        </>
      );
    case "Fourth part":
      return (
        <>
          <h4>{part.name}</h4>
          <ul>
            <li>Number of exercises: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>   
          </ul>   
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
