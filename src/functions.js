import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./thunk_action_Creator";
import { MyComponents } from "./myComponent";

export const MyComponent = ({ numQuestions, difficulty }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [fetchCounter, setFetchCounter] = useState(0);
  let questions = [];

  useEffect(() => {
    const fetchQuestionData = async () => {
      for (let i = 0; i < 10; i++) {
        await dispatch(fetchData());
        setFetchCounter((counter) => counter + 1);
      }
    };

    fetchQuestionData();
  }, [dispatch, numQuestions]);

  if (fetchCounter !== 10) {
    return null;
  }
  if (data !== null || data.length > 0) {
    for (let j = 0; j < data.length; j++) {
      let questionSet = data[j];
      for (let i = 0; i < questionSet.length; i++) {
        const questionData = questionSet[i];
        const { question, id, correctAnswer, incorrectAnswers, difficulty } =
          questionData;
        const answers = [correctAnswer, ...(incorrectAnswers || [])];
        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        questions.push({
          difficulty,
          id,
          question,
          answers,
          correctAnswer,
        });
      }
    }
    if (questions.length !== 0) {
      return (
        <div>
          {questions && Array.isArray(questions) && (
            <MyComponents
              questions={questions}
              difficulty={difficulty}
              numQuestions={numQuestions}
            />
          )}
        </div>
      );
    }
  }

  return null;
};
