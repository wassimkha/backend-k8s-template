const axios = require('axios');

const send_internal_request = async () => {
    return axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: {
            'Host': `backend.com`
            },
        })
}

module.exports = { send_internal_request };
