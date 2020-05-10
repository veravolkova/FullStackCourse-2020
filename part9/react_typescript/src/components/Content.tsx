import React from 'react'

interface ContentProps {
    parts: {
        name: string;
        exerciseCount: number;
    }[];
}

const Content: React.FC<ContentProps> = (props) => {

    const partsList = props.parts.map((part, index) => (
        <li key={index} style={{ listStyleType: 'none' }}>
            {part.name}, {part.exerciseCount}
        </li>
    ));

    return (
        <div>
            {partsList}
        </div>
    );
}
export default Content

