import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('config inter', config);
    return config;
}, function (err) {
    console.log('error inter', err)
    return Promise.reject(err);
});