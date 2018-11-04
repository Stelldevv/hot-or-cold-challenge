import React from 'react';
import StartButton from './start-button'
import GuessForm from './guess-form'
import FeedbackWindow from './feedback-window'
import './hot-or-cold.css';

export default class HotOrCold extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      guessInput: 0,
      guessNumber: 0,
      guesses: [],
      guessAttempt: 0,
      secretNumber: Math.floor((Math.random() * 100) + 1),
      feedback: 'Guess a number'
    }
  }
  
  //generates a new "secret number" when the user clicks "new game" button
  handleStartClick() {
    console.log('handleStartClick ran!');
    const newNumber = Math.floor((Math.random() * 100) + 1);
    this.setState({secretNumber: newNumber});
    this.handleReset();
    this.setState({guessAttempt: 0});
    this.setState({feedback: 'Guess a number'});
  }
  
  handleReset() {
    console.log('handleReset ran!');
    this.setState({guesses: []});
    this.setState({guessNumber: ''});
    this.setState({guessInput: ''});
  }
  
  //stores the current input of the guess bar, so that it can be used for a Guess once the user clicks "Guess!"
  handleGuessInput(guessInput) {
    
    this.setState({guessInput: guessInput})
    console.log('User is typing a guess..');
  }
  
  //sets the guess input into an actual guess when the user clicks "Guess!" (sets this.state.guessNumber equal this.state.guessInput - I couldn't find a practical way to send the number from an input using a button, but I tried a few)
  handleGuessClick() {
    
    var guess = this.state.guessInput.trim();
    var guessList = this.state.guesses;
    var attempt = this.state.guessAttempt;
    console.log(attempt);
    
    if (guess >= 1 && guess <= 100) {
      console.log('User submitted a valid guess of ' + guess);
      if (guessList.includes(guess)) {
        console.log(guess + ' was already attempted!');
        alert('You already tried ' + guess + '!');
      } else {
        this.setState({guessNumber: guess});
        this.setState({guesses: [...guessList, guess]});
        this.setState({guessAttempt: attempt+1});
        this.handleGuess();
        console.log('User has guessed ' + attempt + ' times.');
        console.log('Added ' + guess + ' to ' + guessList);
      }
    } else if (guess < 1 || guess > 100) {
      if (guess > 100){
        alert(guess + ' is too high! (Max: 100)');
      } else if (guess < 1) {
        alert(guess + ' is too low! (Min: 1)');
      } else if (guess === null || guess === '') {
        alert('Field is empty!');
      } else {
        console.log('Invalid guess.');
        alert('Please enter a number from 1 to 100.')
      }
    }
  }
  
  handleGuess() {
    console.log('handleGuess() ran!');
    var guess = this.state.guessInput;
    var secret = this.state.secretNumber;
    var diff = Math.abs(guess - secret);
    console.log('(Guess)' + guess + ' - ' + '(Secret)' + secret + ' = ' + diff);
    
    if (diff === 0) {
      this.setState({feedback: 'You Win! (Play Again?)'});
      this.handleReset();
    } else if (diff <= 3) {
      this.setState({feedback: '!Super Hot!'});
    } else if (diff <= 5) {
      this.setState({feedback: 'Hot'})
    } else if (diff <= 10) {
      this.setState({feedback: 'Toasty'})
    } else if (diff <= 25) {
      this.setState({feedback: 'Warm'})
    } else if (diff <= 50) {
      this.setState({feedback: 'Chilly'})
    } else if (diff <= 75) {
      this.setState({feedback: 'Ice Cold'})
    } else if (diff <= 100) {
      this.setState({feedback: '❄Freezing❄'})
    }
  }
  
  render() {
    
    return (
      
      <div className="HotOrCold">
        <header>
         <span id="hotTitle">Hot</span>-or- 
         <span id="coldTitle">Cold</span>!
        </header>
        
        <GuessForm 
          guessInput={guessInput => this.handleGuessInput(guessInput)}
          guessClick={() => this.handleGuessClick()}
        />
        
        <StartButton 
          newGame={() => this.handleStartClick()}
        />
        
        <FeedbackWindow
          guessNumber={this.state.guessNumber}
          guessHistory={this.state.guesses}
          guessAttempt={this.state.guessAttempt}
          feedback={this.state.feedback}
          secretNumber={this.state.secretNumber}
        />
        
      </div>
      
    );
    
  }
}