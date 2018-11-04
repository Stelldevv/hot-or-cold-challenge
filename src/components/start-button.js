import React from 'react';
import './start-button.css';

export default function StartButton(props) {
  
  return <button 
    id="startButton"
    type="button"
    onClick={props.newGame}>
    New Game
  </button>
}