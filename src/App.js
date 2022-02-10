import React from "react"
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(!tenzies)
    }
  } , [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    let numArr = []
    for (let i = 0; i < 10; i++) {
      numArr.push(generateNewDie())      
    }      
    return numArr
  } 

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(oldDie => {
        return oldDie.isHeld ? oldDie : generateNewDie() 
      }))
    } else {
      setTenzies(false);
      setDice(allNewDice())
    }
    
  }

  function holdDice(id) {
    setDice(oldDie => oldDie.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  

  const diceElements = dice.map(newDie => 
          <Die value={newDie.value} 
                key={newDie.id} 
                isHeld={newDie.isHeld}
                holdDice={() => holdDice(newDie.id)}                
          />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
          className="roll-dice" 
          onClick={rollDice}>
            {tenzies ? `New Game` : `Roll`}
      </button>
      
    </main>
  );
}

export default App;
