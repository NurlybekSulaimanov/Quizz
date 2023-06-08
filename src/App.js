import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import MyComponent from "./myComponent";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  if (startQuiz) {
    return (
      <Provider store={store}>
        <div className="App">
          <MyComponent />
        </div>
      </Provider>
    );
  }

  return (
    <div className="App">
      <h2>Welcome to the Quiz App!</h2>
      <p>Press Start to begin the quiz.</p>
      <button onClick={handleStartQuiz}>Start</button>
    </div>
  );
}

export default App;
