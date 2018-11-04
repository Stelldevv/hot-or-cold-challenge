import React from 'react';
import './guess-form.css'

export default function GuessForm(props) {
  
  return ( 
    <form onSubmit={e => e.preventDefault()}
      id="guessForm"  
    >
      <label htmlFor="guessField"> </label>
      <input 
      type="search" 
      name="guessField" 
      id="guessField"
      placeholder="1 - 100"
      autoComplete="off"
      onChange={e => props.guessInput(e.target.value)}
      />
      <br/>
      <button 
        type="submit"
        id="guessButton"
        onClick={props.guessClick}
      >Guess!</button>
    </form>
  )
}