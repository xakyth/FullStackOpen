import { useState } from 'react'

const AnecdoteOfTheDay = ({anecdotes, points, selected}) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteBody text={anecdotes[selected]} votes={points[selected]} />
    </div>
  )
}

const MostVotesAnecdote = (props) => {
  const { anecdotes, points } = props
  let maxIndex = 0
  for (let i = 0; i < points.length; i++) {
    if (points[i] > points[maxIndex]) {
      maxIndex = i
    }
  }
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <AnecdoteBody text={anecdotes[maxIndex]} votes={points[maxIndex]} />
    </div>
  )
}

const AnecdoteBody = (props) => {
  const {text, votes} = props
  return (
    <div>
        {text}
        <br/>
        has {votes} votes
    </div>
  )
}

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
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  
  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVote = () => {
    const updPoints = [...points]
    updPoints[selected] += 1
    setPoints(updPoints)
  }
    
  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} points={points} selected={selected} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <MostVotesAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App