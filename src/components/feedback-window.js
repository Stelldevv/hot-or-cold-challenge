import React from 'react';
import './feedback-window.css';

export default function FeedbackWindow(props) {
    
    return (
        <div>
          You guessed: {props.guessNumber}
          <br/>
          Guesses({props.guessAttempt}): {props.guessHistory.toString()}
          <br/>
          <span id="hint">Hint: {props.feedback}</span>
          <br/>
        </div>
    );
}
