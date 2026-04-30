import { useState } from 'react'
const Header = ({text}) => <h2>{text}</h2>
const Button = ({handleClick, text}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad
  if (all===0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all} </p>
      <p>average {(good-bad)/all}</p>
      <p>positive { good /(good+ neutral + bad)*100 } %</p>
    </div>
   
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Header text = 'give feedback' />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Header text = 'statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App