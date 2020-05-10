import React from 'react'

interface TotalProps {
    parts: {
        name: string;
        exerciseCount: number;
    }[];
}

const Total: React.FC<TotalProps> = (props) => {

    const total = props.parts.reduce((acc, value) => {
        return acc + value.exerciseCount
    }, 0)

    return (
        <h5>total of {total} exercises</h5>
    );
}

export default Total