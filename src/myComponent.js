import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./thunk_action_Creator";
import React from "react";
import { useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
const MyComponent = () => {
  const dispatch = useDispatch();
  let data = [];
  data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>{data && Array.isArray(data) && <MyComponents data={data} />}</div>
  );
};

let correct = 0;
let wrong = 0;
let selectedAnswer = null;

const MyComponents = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    let timer;

    const handleTimer = () => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    };
    if (seconds > 0) {
      timer = setTimeout(handleTimer, 1000);
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  if (data && Array.isArray(data)) {
    const currentQuestion = data[currentQuestionIndex];
    let answers = [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ];
    const handleButtonClick = (index) => {
      setSelectedButtonIndex(index);
      selectedAnswer = answers[index];
    };
    const handleNextQuestion = () => {
      const currentQuestion = data[currentQuestionIndex];
      console.log(selectedAnswer, currentQuestion.correctAnswer);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        correct += 1;
      } else {
        wrong += 1;
      }
      if (currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedButtonIndex(null);
        setSeconds(120);
        selectedAnswer = null;
      }
    };
    if (seconds === 0) {
      handleNextQuestion();
    }
    return (
      <div>
        <div>{currentQuestion.question.text}</div>
        {answers.map((answer, index) => (
          <div key={index}>
            <button
              color={selectedButtonIndex === index ? "dark" : "light"}
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
  }

  return null;
};

export default MyComponent;
