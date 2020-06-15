import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<{ part: CoursePart }> = (props) => {  

  const p = () => {
    switch (props.part.name) {
      case "Fundamentals":             
        break;
      case "Using props to pass data":
        //console.log(props.part.name)    
        break;
      case "Deeper type usage":
        break;
      default:
        break;
    }}
  ;

  //to do 
  return (   
    <>
      {p}    
    </>
  );
};

export default Part;
