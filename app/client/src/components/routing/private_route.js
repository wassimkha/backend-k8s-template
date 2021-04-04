import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps
)(PrivateRoute);
