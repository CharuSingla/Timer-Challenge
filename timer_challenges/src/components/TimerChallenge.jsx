import { useState, useRef} from "react";
import ResultModal from "./resultModal.jsx"; 

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef(null); // useRef is used to create a reference to the timer
  const dialog = useRef(); // useRef is used to create a reference to the dialog
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current); // The timer is cleared when the time runs out
    timer.current = null; // Ensure the interval is properly cleared
    dialog.current.open(); // The dialog is opened when the time runs out
  }

  function handleReset () {
    clearInterval(timer.current); // Stop the timer
    timer.current = null; // Ensure new intervals after reset
    setTimeRemaining(targetTime * 1000); // Reset the time remaining
  }

  function handleStart () {
    if (!timer.current) { // The timer is started only if it is not already running
      timer.current = setInterval(() => { // The timer is started when the button is clicked
      setTimeRemaining(prevTimeRemaining => Math.max(prevTimeRemaining - 10, 0));
    }, 10);
  }
  }

  function handleStop () {
    clearInterval(timer.current); // The timer is cleared when the button is clicked
    timer.current = null; // Ensure the interval is properly cleared
    dialog.current.open(); // The dialog is opened when the button is clicked
  }  
  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} remainingTime = {timeRemaining} onReset = {handleReset} />
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p> 
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <button onClick={handleReset}>Reset</button>
      <p className={timerIsActive ? 'active' : undefined}>
        {timerIsActive ? 'Time is running...' : 'Timer Inactive !'}
      </p>
    </section>
    </>
  );
}