const axios = require('axios');

const send_internal_request = async (service, route) => {
    const data = await axios.post('http://172-17-0-2.kubernetes.default.svc.cluster.local/auth/online', {
        user_id: 'wassim'
    })
    console.log(data.data)
}

send_internal_request('/auth/', 'online');
