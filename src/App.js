import React from 'react';
import AskQuestion from './components/routes/AskQuestion';
import Home from './components/routes/Home';
import Navbar from './components/routes/Navbar';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './components/context/AuthContext';

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
        </Switch>
      </AuthProvider>
    </>
  )
}

export default App