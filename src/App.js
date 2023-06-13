import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import MyComponent from "./myComponent";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(parseInt(event.target.value));
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  if (startQuiz) {
    return (
      <Provider store={store}>
        <div className="App">
          <MyComponent numQuestions={numQuestions} difficulty={difficulty} />
        </div>
      </Provider>
    );
  }

  return (
    <div className="App">
      <h2>Welcome to the Quiz App!</h2>
      <p>Choose the number of questions you want:</p>
      <select value={numQuestions} onChange={handleNumQuestionsChange}>
        <option value={10}>10 Questions</option>
        <option value={20}>20 Questions</option>
        <option value={30}>30 Questions</option>
        <option value={40}>40 Questions</option>
        <option value={50}>50 Questions</option>
      </select>
      <p>Choose the difficulty:</p>
      <select value={difficulty} onChange={handleDifficultyChange}>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <p>Press Start to begin the quiz.</p>
      <button onClick={handleStartQuiz}>Start</button>
    </div>
  );
}

export default App;
