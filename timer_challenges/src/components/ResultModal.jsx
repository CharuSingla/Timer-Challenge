import {forwardRef, useImperativeHandle, useRef} from 'react'
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal ({targetTime, remainingTime, onReset}, ref) { // forwardRef is used to forward refs to child components 
  // The ref prop is used to forward the ref to the dialog element
  const dialog = useRef(); // useRef is used to create a reference to the dialog element

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // 2 decimal places
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => { // useImperativeHandle is used to expose imperative methods to parent components
    return {
      open() { // open method is used to open the dialog
        dialog.current.showModal(); // The dialog is shown when the open method is called
      }
    }
  });
  return createPortal( // createPortal is used to render the dialog outside the current component
  <dialog ref={dialog} className="result-modal" onClose={onReset}>
    {userLost && <h2>You lost !</h2>} 
    {!userLost && <h2> {score > 50 ? 'Congratulations' : 'OOPS'}! Your score is <strong>{score}%</strong></h2>}
    <p>The target time was <strong>{targetTime} seconds.</strong></p>
    <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p> 
    <form method="dialog" onSubmit={onReset}>
      <button>Close</button>   
    </form>
  </dialog>,
  document.getElementById('modal') // The dialog is rendered in the modal element
  );
});
// Closes the dialog when button is clicked, without using any extra JavaScript.
export default ResultModal;