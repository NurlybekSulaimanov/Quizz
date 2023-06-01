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

const MyComponents = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  if (data && Array.isArray(data)) {
    const currentQuestion = data[currentQuestionIndex];

    let answers = currentQuestion.incorrectAnswers;
    answers.push(currentQuestion.correctAnswer);
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return (
      <div>
        <CCard style={{ width: "18rem" }}>
          <CListGroup flush>
            <CListGroupItem>{currentQuestion.question.text}</CListGroupItem>
            <CListGroupItem>
              <div className="d-grid gap-2">
                <CButton color="light">{answers[0]}</CButton>
              </div>
            </CListGroupItem>
            <CListGroupItem>
            <div className="d-grid gap-2">
                <CButton color="light">{answers[1]}</CButton>
              </div>
            </CListGroupItem>
            <CListGroupItem>
            <div className="d-grid gap-2">
                <CButton color="light">{answers[3]}</CButton>
              </div>
            </CListGroupItem>
            <CListGroupItem>
            <div className="d-grid gap-2">
                <CButton color="light">{answers[2]}</CButton>
              </div>
            </CListGroupItem>
          </CListGroup>
        </CCard>
        <div>
          <button onClick={handleNextQuestion}>Next question</button>
        </div>
      </div>
    );
  }

  return null;
};

export default MyComponent;
