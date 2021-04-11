const axios = require('axios');

const send_internal_request =  () => {
    return axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: {
            'Content-Type': 'application/json'
            },
        })
}

const axios_instance = send_internal_request();

module.exports = { axios_instance };
