import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";


const Content: React.FC< {parts: CoursePart []} > = ({ parts }) => {   

  const cont = parts.map((item, index) => 
    <p key={index}>
      <Part part={item} />
    </p>
  );

  return (
    <div>
      {cont}
    </div>
  ); 
};
export default Content;




 
 