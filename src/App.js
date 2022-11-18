import React from 'react';
import AskQuestion from './components/routes/AskQuestion';
import Home from './components/routes/Home';
import Navbar from './components/routes/Navbar';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>

      <Navbar />
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={AskQuestion} path="/AskQuestion" />
      </Switch>
    </>
  )
}

export default App