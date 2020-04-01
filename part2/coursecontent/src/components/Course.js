import React from 'react';
import Content from './Content';
import Header from './Header';

export default function Course (props) {

const courseList = props.courses.map((course, index) => (       
      <li key={index} style={{ listStyleType: 'none' }}>
        <Header name={course.name} />
        <Content course={course}/>
      </li>    
  ));

  return (
    <div>     
        {courseList}     
    </div>
  );
}


