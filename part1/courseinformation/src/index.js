import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => (
    <p>
        {props.course.name}
    </p>
)

const Part = (props) => (   
    <p>
        {props.part.name}, {props.part.ex}
    </p>
)

const Content = (props) => {
    return (
        <div>
            <Part part={{ name: props.course.parts[0].name, ex: props.course.parts[0].ex }} />
            <Part part={{ name: props.course.parts[1].name, ex: props.course.parts[1].ex }} />
            <Part part={{ name: props.course.parts[2].name, ex: props.course.parts[2].ex }} />
        </div>
    )
}

const Total = props => props.course.parts[0].ex + props.course.parts[1].ex + props.course.parts[2].ex


const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                ex: 10
            },
            {
                name: 'Using props to pass data',
                ex: 7
            },
            {
                name: 'State of a component',
                ex: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))