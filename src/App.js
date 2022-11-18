import React from 'react';
import AskQuestion from './components/routes/AskQuestion';
import Home from './components/routes/Home';
import Navbar from "./components/Navbar"
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './components/context/AuthContext';
import ForgetPassword from './components/ForgetPassword';
import AnswerQuestion from './components/routes/AnswerQuestion';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={AskQuestion} path="/AskQuestion" />
          <Route component={Login} path="/Login" exact />
          <Route component={Signup} path="/Signup" exact />
          <Route component={ForgetPassword} path="/ForgetPassword" exact />
          <Route component={AnswerQuestion} to="/AnswerQuestion?"></Route>
        </Switch>
      </AuthProvider>
    </>
  )
}

export default App