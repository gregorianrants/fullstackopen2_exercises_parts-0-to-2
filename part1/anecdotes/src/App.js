import {useState} from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    function zeros(length) {
        let result = []
        for (let i = 0; i < length; i++) {
            result.push(0)
        }
        return result
    }

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(() => zeros(anecdotes.length))

    // const incrementIndex =()=>{
    //   setSelected((selected+1)%(anecdotes.length))
    // }

    function handleSetRandomIndex() {
        const i = Math.floor(Math.random() * anecdotes.length)
        setSelected(i)
    }

    function handleVote() {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    function getAnecdoteWithMostVotes() {
        const index = votes.indexOf(Math.max(...votes))
        return anecdotes[index]
    }

    return (

        <div>

            <div style={{minHeight: '6rem'}}>
              <h2>Anecdote of the day</h2>
                <p>{anecdotes[selected]}</p>
                <p>has {votes[selected]} votes</p>
            </div>

            <div>
                <button onClick={handleSetRandomIndex}>
                    random anecdote
                </button>
                <button onClick={handleVote}>
                    vote
                </button>
            </div>

          <div>
            <h2>Anecdote with most votes</h2>
            <p>
              {getAnecdoteWithMostVotes()}
            </p>
              

          </div>


        </div>
    )
}

export default App