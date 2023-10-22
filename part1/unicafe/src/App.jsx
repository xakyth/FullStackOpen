import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const computeTotal = () => good + neutral + bad
  const computeAverage = () => {
    return (good - bad) / computeTotal()
  }
  const computePositive = () => {
    return ((good) / computeTotal() * 100)
  }

  if (computeTotal() == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={computeTotal()} />
            <StatisticLine text='average' value={computeAverage()} />
            <StatisticLine text='positive' value={computePositive() + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClickGood} text='good'/>
      <Button handleClick={handleClickNeutral} text='neutral'/>
      <Button handleClick={handleClickBad} text='bad'/>
      <h2>Statistic</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App