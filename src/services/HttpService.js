import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/api/' :
    '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method = 'get', data = null) {
    console.log(endpoint);
    console.log(method);
    console.log(data);
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log('bad');
        if (err.response.status === 401) {
            console.log('err 401', err);
        }
        console.log(`Had issues ${method}ing to server`, err)
        throw err;
    }
}