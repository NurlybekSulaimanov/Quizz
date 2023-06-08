import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./thunk_action_Creator";
import { useState } from "react";
import { MyComponents } from "./myComponent";

export const MyComponent = () => {
  const dispatch = useDispatch();
  let data = [];
  data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  let questions = [];

  if (data !== null) {
    for (let i = 0; i < data.length; i++) {
      const questionData = data[i];
      const { question, id, correctAnswer, incorrectAnswers } = questionData;
      const answers = [correctAnswer, ...incorrectAnswers];
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      questions.push({
        id,
        question,
        answers,
        correctAnswer,
      });
    }
    return (
      <div>
        {questions && Array.isArray(questions) && (
          <MyComponents questions={questions} />
        )}
      </div>
    );
  }
};
