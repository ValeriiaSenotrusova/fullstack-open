import { useState } from 'react'
const Header = ({text}) => <h2>{text}</h2>
const Button = ({handleClick, text}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const All = ({good,neutral,bad}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad} </p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive { good /(good+ neutral + bad)*100 }</p>
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
      <All good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App