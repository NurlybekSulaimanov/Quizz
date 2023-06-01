import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MyComponent from './myComponent';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyComponent />
      </div>
    </Provider>
  );
}

export default App;

