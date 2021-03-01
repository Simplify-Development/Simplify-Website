import axios from 'axios';

export function getUserDetails() {
    return axios.get('http://localhost:5000/api/auth', {
        withCredentials: true
    })
}