import './App.css';
import React, {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import CurrentUser from './components/current_user/CurrentUser'
import {Provider} from "react-redux";
import store from "./redux/store";
import set_auth_token from "./utils/setAuthToken";

import {load_user} from "./redux/actions/auth";
import PrivateRoute from "./components/routing/private_route";

if (localStorage.token) {
    set_auth_token(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(load_user());
    }, [])
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section>
                        <Switch>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <PrivateRoute exact path='/currentuser' component={CurrentUser}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
