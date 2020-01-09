import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Statistics = (props) => (
    <tr><td>
        {props.text}
    </td><td>
            {props.value}
        </td></tr>
)

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = props => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (

        <div>
            <h1>give feedback</h1>

            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />

            <h1>statistics</h1>

            {good + bad + neutral === 0 ? "No feedback given" :
                <table>
                    <tbody>
                        <Statistics text="good" value={good} />
                        <Statistics text="neutral" value={neutral} />
                        <Statistics text="bad" value={bad} />
                        <Statistics text="all" value={good + bad + neutral} />
                        <Statistics text="average" value={(good * 1 + bad * (-1)) / (good + bad + neutral) || 0} />
                        <Statistics text="positive" value={(good / (good + bad + neutral) * 100 || 0) + " %"} />
                    </tbody>
                </table>
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))