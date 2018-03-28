import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Login />
      <p>React here!</p>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
