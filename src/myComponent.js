import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { MyComponent } from "./functions";

export const MyComponents = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const currentQuestion = questions[currentQuestionIndex];
  let answers = currentQuestion.answers;
  const handleNextQuestion = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[selectedButtonIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setWrong((prevWrong) => prevWrong + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedButtonIndex(null);
      setSeconds(15);
    } else {
      setQuizCompleted(true);
    }
  }, [answers, currentQuestionIndex, questions, selectedButtonIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [seconds, handleNextQuestion]);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  if (quizCompleted) {
    const handleStartAgain = () => {
      window.location.reload();
    };

    return (
      <div>
        <h2>Congratulations!</h2>
        <p>
          You have {correct} correct answers from {questions.length} questions.
        </p>
        <button onClick={handleStartAgain}>Start Again</button>
      </div>
    );
  }

  return (
    <div>
      <div>{currentQuestion.question.text}</div>
      {answers.map((answer, index) => (
        <div key={index}>
          <button
            style={{
              backgroundColor: selectedButtonIndex === index ? "dark" : "light",
            }}
            onClick={() => handleButtonClick(index)}
          >
            {answer}
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleNextQuestion}>Next question</button>
      </div>
      <div>Correct: {correct}</div>
      <div>Wrong: {wrong}</div>
      <div>Timer: {seconds} seconds</div>
    </div>
  );
};

export default MyComponent;
