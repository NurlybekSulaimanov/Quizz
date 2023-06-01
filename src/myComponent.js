import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./thunk_action_Creator";
import React from "react";
import { useState } from "react";
import { CCard, CListGroup, CListGroupItem, CButton } from "@coreui/react";
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
  const [shuffle, setShuffle] = useState(true);
  if (data && Array.isArray(data)) {
    const currentQuestion = data[currentQuestionIndex];

    let answers = [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ];
    if (shuffle === true) {
      setShuffle(false);
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      console.log("answers");
    }

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
        setShuffle(true);
      }
    };

    return (
      <div>
        <CCard style={{ width: "18rem" }}>
          <CListGroup flush>
            <CListGroupItem>{currentQuestion.question.text}</CListGroupItem>
            {answers.map((answer, index) => (
              <CListGroupItem key={index}>
                <CButton
                  color={selectedButtonIndex === index ? "dark" : "light"}
                  onClick={() => handleButtonClick(index)}
                >
                  {answer}
                </CButton>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCard>
        <div>
          <button onClick={handleNextQuestion}>Next question</button>
        </div>
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
      </div>
    );
  }

  return null;
};

export default MyComponent;
