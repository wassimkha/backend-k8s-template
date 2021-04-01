import './App.css';
import React, { Fragment } from "react";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
  return (
      <Router>
          <Fragment className="App">
              <Navbar />
              <Route exact path='/' component={Landing}/>
                <section>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                    </Switch>
                </section>
          </Fragment>
      </Router>
  );
}

export default App;
