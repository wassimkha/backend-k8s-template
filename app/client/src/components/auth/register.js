import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import {register} from "../../redux/actions/auth";
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
const Register = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onInput = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault();
        register({email, password});
    }

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={e => onSubmit(e)}>
                <label> email </label> <br/> <br/>
                <input type="text" name="email" value={email} onChange={e => onInput(e)}/> <br/> <br/>
                <label> password </label> <br/> <br/>
                <input type="Password" name="password" value={password} onChange={e => onInput(e)}/> <br/> <br/>
                <input type="submit" value="Submit"/> <br/> <br/>
            </form>
        </Fragment>
    );
}

Register.prototype = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {register}
)(Register);