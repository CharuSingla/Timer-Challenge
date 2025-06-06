import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef(); // useRef is used to create a reference to the input element
  const [enteredPlayerName, setEnteredPlayerName] = useState(null); // useState is used to create a state variable

  function handleClick () {
    setEnteredPlayerName(playerName.current.value); // The value of the input element is stored in the state variable
    playerName.current.value = ' '; // The input element is cleared
  }

  return (
    <header id="content">
      <section id="player">
        <h1>THE <em>ALMOST</em> FINAL COUNTDOWN </h1> 
          <p>Stop the timer once you estimate that timer is (almost) up !</p>
        <h2>Ready to beat the clock '<i>{enteredPlayerName ?? 'Challenger'}</i> ' ?</h2>
        <p>
          <input ref={playerName} type="text"/>
          <button onClick={handleClick}>Set Name</button> 
        </p>
      </section>
    </header>
  );
}
