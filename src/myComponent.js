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

    return (
      <div>
        <CCard style={{ width: "18rem" }}>
          <CListGroup flush>
            <CListGroupItem>
              <CButton>{currentQuestion.incorrectAnswers[1]}</CButton>
            </CListGroupItem>
            <CListGroupItem>
              <CButton>{currentQuestion.correctAnswer}</CButton>
            </CListGroupItem>
            <CListGroupItem>
              <CButton>{currentQuestion.incorrectAnswers[0]}</CButton>
            </CListGroupItem>
            <CListGroupItem>
              <CButton>{currentQuestion.incorrectAnswers[2]}</CButton>
            </CListGroupItem>
          </CListGroup>
        </CCard>
        <div>{currentQuestion.question.text}</div>
        <div>
          <button onClick={handleNextQuestion}>Next question</button>
        </div>
      </div>
    );
  }

  return null;
};

export default MyComponent;
