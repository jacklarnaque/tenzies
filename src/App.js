import './App.css';
import Die from './components/Die';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Test from './components/test';

export default function App() {
  const [numbers, setNumbers] = useState(allNewDice)
  const [allNumFound, setAllNumFound] = useState(false)
  const [counter, setCounter] = useState(3)
  const [rules, setRules] = useState(true)
  const [isStart, setIsStart] = useState(false)
  const [lose, setLose] = useState(false)
  const [win, setWin] = useState(false)


    // the new dice function define a empty array, then push the object init
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(randomNum())
      }
      return  newDice
  }
  

//<---this is the counter--->
  useEffect(() => {
    if (isStart) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setCounter('Sorry, times up! Try again!');
      }
    }
  }, [counter, isStart])

  useEffect(() => {
    if (counter === 0){
      setLose(true)
    }
  },[lose, counter])
 console.log(lose)
  useEffect(()=> {
      const firstNum = numbers[0].value
      const allNum = numbers.every(num => num.value === firstNum)
      const allHeld = numbers.every(num => num.isHeld)
         if(allNum && allHeld) {
            setAllNumFound(true)
         }
  }, [numbers, lose])


  function randomNum () {
   return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
    }
  }
  
  // set up  a state to display the rules if any numbers are h)eld yet
  //is hheld : return allnewdice only for the number which are nor held.
  //we want to compare the numbers 
  function isHeldFunction(id) {
    setNumbers(prevNumbers => prevNumbers.map(number => {
        return number.id === id? 
        {...number, isHeld: !number.isHeld} : number
    }))
  }
  function roll (){
    setRules(false)
    setIsStart(true)
    if(!allNumFound && !lose){
      setNumbers(prevNumbers => prevNumbers.map(die => {
        return die.isHeld? {...die} : randomNum()
      }))
    } else {
      setAllNumFound(false)
      setNumbers(allNewDice())
      
    }
}

  const diceElem = numbers.map(num => 
  <Die 
  value={num.value}
  isHeld={num.isHeld}
  key={num.id}
  isHeldFunction={() => isHeldFunction(num.id)}
  />)

  return (

    <>
 {allNumFound && !lose?
<Confetti/>
: <Test/>}

      <main>
        <h1>Tenzie Game</h1>
        {rules? <p style={{color: 'lightpink', textAlign:'center'}}>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        <br/><br/>
          <b>Click on the button 'Roll' to Start!</b></p>: 
        lose? '' : "Hurry up! time up in"}
          {isStart?
          <p>{counter}</p>:
          ''}
        <p>{counter <= 0? 'Sorry to late, try again!' : ''}</p>
          <div
          className="dice-container">
            {isStart?
            diceElem: ''}
          </div>
          <button 
          onClick={()=> {roll()}}
          className='roll-button'>{allNumFound || lose? "New Game": "Roll"}</button>
      </main>
          </>
  )
}