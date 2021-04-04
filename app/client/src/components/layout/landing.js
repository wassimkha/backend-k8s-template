import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div>
                <h1>Landing</h1>
                <h1><Link to='/register' >Register</Link></h1>
                <h1><Link Link to='/login' >Login</Link></h1>
                <h1><Link Link to='/currentuser' >current user</Link></h1>
            </div>

        );
    }
}

export default Landing;