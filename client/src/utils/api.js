import axios from 'axios';
import React from 'react';

export function getUserDetails()  {
    return axios.get('http://localhost:5001/api/auth', {
        withCredentials: true
    })
}