import React from 'react'

export default function Die(props) {
  return (
    <div className={`die-face ${props.isHeld ? `isheld` : ""}`}>
        <h2 className='die-num'
            onClick={props.holdDice}
        >{props.value}</h2>
    </div>
  )
}
