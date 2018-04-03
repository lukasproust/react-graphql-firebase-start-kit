import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Login from './components/Login';

import css from './shared/styles/common.css';

const App = () => {
  return (
    <div className={css.root}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Login />
      </MuiThemeProvider>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
