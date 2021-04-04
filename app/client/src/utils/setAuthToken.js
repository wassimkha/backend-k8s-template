import axios from 'axios';

const set_auth_token = token => {
    if (token) {
        axios.defaults.headers.common['token'] = token
    } else {
        delete axios.defaults.headers.common['token']
    }
}

export default set_auth_token;