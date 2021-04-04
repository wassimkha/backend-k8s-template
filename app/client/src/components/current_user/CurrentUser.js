import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

const CurrentUser = ({user}) => {
    console.log('user is')
    console.log(user)
    return (
        <div>
            <h1>current user is</h1>
            <h3>{user["email"]}</h3>
        </div>
    );
};

CurrentUser.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(
    mapStateToProps,
    {}
)(CurrentUser);
