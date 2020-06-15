// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;  
}

interface CourseWithDescription extends CoursePartBase {      
  description: string;
}

interface CoursePartOne extends CoursePartBase {
  //name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  //name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  //name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
