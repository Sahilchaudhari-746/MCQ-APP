import React, { useState } from 'react';
import questionsData from './questionsData';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questionsData.length).fill(null));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = questionsData.map(question => question.correctAnswer);
    const userScore = userAnswers.reduce((acc, answer, index) => {
      if (answer === correctAnswers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(userScore);
    setShowScore(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="App">
      <h1>React MCQ Game</h1>
      {showScore ? (
        <div>
          <h2>Your score: {score} / {questionsData.length}</h2>
        </div>
      ) : (
        <div>
          <Question
            question={questionsData[currentQuestion]}
            onSelect={handleOptionSelect}
          />
          {currentQuestion < questionsData.length - 1 && (
            <button onClick={nextQuestion}>Next</button>
          )}
          {currentQuestion === questionsData.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      )}
    </div>
  );
}

function Question({ question, onSelect }) {
  const handleOptionSelect = (option) => {
    onSelect(option);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
