import {useState} from 'react'


function average({total, n}) {
    if (n === 0) return 0
    return total / n
}

function StatisticLine({text,value}){
    return <tr><td>{text}</td><td>{value}</td></tr>
}

function Statistics({good, neutral, bad}) {

    function getTotalScore() {
        const scorePerVote = {
            good: 1,
            neutral: 0,
            bad: -1
        }
        return (good * scorePerVote.good
            + neutral * scorePerVote.neutral
            + bad * scorePerVote.bad)
    }

    const numberOfVotes = good + neutral + bad
    const averageScore = average({total: getTotalScore(), n: numberOfVotes})
    const positivePercentage = average({total: good, n: numberOfVotes})

    if(numberOfVotes===0) return null

    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                <StatisticLine text='good' value={good}/>
                <StatisticLine text='neutral' value={neutral}/>
                <StatisticLine text='bad' value={bad}/>
                <StatisticLine text='all' value={numberOfVotes}/>
                <StatisticLine text='average' value={averageScore}/>
                <StatisticLine text='positive' value={`${positivePercentage} %`}/>
                </tbody>
            </table>

        </>
    )


}

function Button({onButtonClick,text}){
    return <button onClick={onButtonClick}>{text}</button>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <Button onButtonClick={() => setGood(good + 1)} text='good'/>
                <Button onButtonClick={() => setNeutral(neutral + 1)} text='neutral'/>
                <Button onButtonClick={() => setBad(bad + 1)} text=' bad'/>
            </div>
            <Statistics {...{good, bad, neutral}}/>

        </div>
    )
}

export default App


