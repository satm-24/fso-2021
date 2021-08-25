import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}




const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all;
  const positive = props.good / all * 100 + " %";

  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given.
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>

    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)


  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const maxPoints = points.indexOf(Math.max.apply(null, points))

  const handleVote = () => {
    const copy = [...points]

    copy[selected] += 1
    setPoints(copy)
  }



  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
      <br></br>

      <h1>Anecdote of the day</h1>

      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes.
      <br></br>
      <Button handleClick={handleVote}
        text="vote" />
      <Button handleClick={() => setSelected(getRandomInt(7))}
        text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxPoints]} <br></br> has {points[maxPoints]} votes</p>

    </div>
  )
}

export default App