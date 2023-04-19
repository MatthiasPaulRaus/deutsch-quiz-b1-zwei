import React, {useState} from "react";
import QuestionsList from "./QuestionsList"
import './App.css';
import {v4 as uuidv4} from 'uuid';

const App =()=> {

  const [currentQuestion, setCurrentQuestion]= useState(0);
  const [score, setScore]= useState(0)
  const [clicked, setClicked] = useState(false);
  const [showScore, setShowScore]= useState(false);
  const [valid, setValid]= useState(false)

  const handleCorrectAnswer = (isCorrect) => {
    if(isCorrect) {
      setScore(score + 1);
      setValid(true)
    }
    setClicked(true);
    
  }

  const handleNextQuestion = () => {
    setClicked(false);
    setValid(false)
    if(currentQuestion < QuestionsList.length -1){
      setCurrentQuestion(currentQuestion +1)
    }
    else{
      setShowScore(true);
    }
  }

  const playAgain = ()=> {
    window.location.reload()
  }

  return (
    <div className="app-wrapper">

      {showScore ? (
        <div>
          <div className="completed">Ende!</div>

          <div className="score-section">
            Punkte: {score}/{QuestionsList.length}
          </div>

          <button className="next-button"
          onClick={playAgain}
          >Spiel wiederholen</button>

           
          </div>
        ) : (
      
        <div className="question-section-wrapper">

          <div className="question-count">
           Aufgabe {currentQuestion + 1} von {QuestionsList.length}
          </div>

          <div className="question">
            {QuestionsList[currentQuestion].question}
          </div>

          <div className="answer-section-wrapper">
            {QuestionsList[currentQuestion].answersList.map((answerOption) => (
              <li className="answer-list" key={uuidv4()}>
                <button 
                disabled={clicked}
                className={`answer-button
                 ${clicked && answerOption.isCorrect ? "correct" : null}`}

                onClick={() => handleCorrectAnswer(answerOption.isCorrect)}
                >
                {answerOption.answer} 
                </button>
              </li>
            ))}
          </div>

          {clicked && valid &&
          <div className="richtig"
          >richtig</div>
          }

          {clicked && !valid &&
          <div className="falsch"
          >falsch</div>
          }
          <div>
            <button className="next-button"
            onClick={handleNextQuestion}
            disabled={!clicked}
            >weiter</button>
          </div>
      
        </div>
      )}
    </div>
  )
}

export default App

