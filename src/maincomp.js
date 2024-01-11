// Import React and necessary hooks and styles
import React, { useState, useEffect, useCallback } from 'react';
import './main.css'; // Import styles from external CSS file

// Button component for starting or resetting the quiz
function Button({ check, onButtonClick }) {
  return (
    <button className='startbtn'  onClick={onButtonClick}>
      {check ? "Reset" : "Start"}
    </button>
  );
}

// Buttons component for displaying answer choices and handling button clicks
function Buttons({ correct, onButtonClick, bool, incmarks, settotal, operator }) {
  // Generate an array of numbers including the correct answer
  let anyarray = [];
  if (operator === "*") {
    anyarray = [
      Math.floor(Math.random() * 1000) + 70,
      Math.floor(Math.random() * 1000) + 70,
      Math.floor(Math.random() * 100) + 70,
      correct
    ];
  } else {
    anyarray = [
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      correct
    ];
  }

  // Shuffle the array to randomize button order
  const shuffledArray = shuffleArray(anyarray);

  // Handle button click and update marks and total
  const handleButtonClick = (key) => {
    onButtonClick();
    if (key === correct) {
      incmarks((prevMarks) => prevMarks + 1);
      settotal((prevMarks) => prevMarks + 1);
      bool(true);
    } else {
      settotal((prevMarks) => prevMarks + 1);
      bool(false);
    }
  };

  // Map through the shuffled array and render buttons
  return shuffledArray.map((key, index) => (
    <button key={index} onClick={() => handleButtonClick(key)} className="btn">
      {key}
    </button>
  ));
}

// Function to shuffle an array
function shuffleArray(array) {
  let shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

// CountdownTimer component for displaying the countdown timer
function CountdownTimer({ marks, total, setPopup, setcheckstart, popup }) {
  const [seconds, setSeconds] = useState(60);

  // Update the countdown timer
  useEffect(() => {
    let intervalId;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setPopup(true);
    }

    return () => clearInterval(intervalId);
  }, [seconds, setPopup]);

  return (
    <div className='p'>
      <div className={`timer ${seconds === 0 ? 'timer-expired' : ''}`} style={{ display: popup ? "none" : "flex", textAlign: 'center' }}>
        <p>Time Remaining: {seconds}</p>
      </div>

      <div className={`popup ${seconds === 0 ? 'popup-show' : ''}`}>
        {seconds === 0 ? <div className="center"> Quiz Over! <br />Marks: {marks} Total:{total}</div> : null}
      </div>
    </div>
  );
}

// Main Quiz component
export default function Quiz() {
  const [checkstart, setcheckstart] = useState(false);
  const [num1, setnum1] = useState(0);
  const [num2, setnum2] = useState(0);
  const [num3, setnum3] = useState(0);
  const [marks, setmarks] = useState(0);
  const [total, settotal] = useState(0);
  const [bool, setBool] = useState(null);
  const [popup, setPopup] = useState(null);
  const [signs, setsigns] = useState(['+', '-', '*']);
  const [operator, setoperator] = useState("");

  // Display component for showing the mathematical expression
  const Display = ({ num1, num2, operator }) => {
    setnum3(
      operator === "+"
        ? num1 + num2
        : operator === "-"
        ? num1 - num2
        : num1 * num2
    );
    return (
      <div className="display">
        {num1}
        {operator}
        {num2}
      </div>
    );
  };

  // Function to generate random numbers and operator
  const generatenumbers = useCallback(() => {
    setnum1(Math.floor(Math.random() * 100) + 1);
    setnum2(Math.floor(Math.random() * 100) + 1);
    const newOperator = signs[Math.floor(Math.random() * 3)];
    setoperator(newOperator);
  }, [num1, num2, signs]);

  useEffect(() => {
    console.log("calling generatenumbers", num1, num2, num3, operator);
  }, [num1, num2, num3, operator]);

  // Function to handle quiz start/reset
  const generatecheckstart = () => {
    setcheckstart(!checkstart);
    setPopup(false); // Reset popup status
    setBool(null);
    setmarks(0);
    settotal(0);
    generatenumbers();
    console.log("check start");
  };

  // Start component for rendering the start/reset button
  const Start = () => {
    return (
      <>
        <Button check={checkstart} onButtonClick={generatecheckstart} />
      </>
    );
  };

  // Placeholder component for inactive buttons before quiz starts
  const btns = () => {
    return (
      <>
        {!checkstart && (
          <>
            <button className='btn'></button>
            <button className='btn'></button>
            <button className='btn'></button>
            <button className='btn'></button>
          </>
        )}
      </>
    );
  };

  // Render the main quiz components
  return (
    <>
      <div className="main">
        <div className={`displaycorrect`}>
          <div className="dsc" style={{ textAlign: 'center' }}>
            {checkstart && bool !== null ? (
              bool ? (
                <div className="correct" style={{ display: popup ? "none" : "flex" }}>Correct!</div>
              ) : (
                <div className="incorrect" style={{ display: popup ? "none" : "flex" }}>Incorrect!</div>
              )
            ) : null}
          </div>

          <div className="Marks">Marks: <span style={{ display: !popup ? "block" : "none" }}>{checkstart && marks}</span></div>
        </div>
        <div className="secondmain">
          <div className="display">
            {checkstart && <Display num1={num1} num2={num2} operator={operator} />}
          </div>
          <div className="desc">Click one of the choices below</div>
          <div className="btnn">
            {checkstart && <Buttons settotal={settotal} marks={marks} incmarks={setmarks} bool={setBool} onButtonClick={generatenumbers} correct={num3} operator={operator} />}
            {btns()}
          </div>
        </div>

        <div className="end">
          <div className="start">
            <Start />
          </div>
          <div className="countdown">
            {checkstart && <CountdownTimer popup={popup} setcheckstart={setcheckstart} setPopup={setPopup} marks={marks} total={total} />}
          </div>
        </div>
      </div>
    </>
  );
}
