import React from 'react';

export default function Part (props) {
//console.log(props.part.name)  
  return (   
    <>
        {props.part.name}  , {props.part.ex}      
    </>
  );
}



