import axios from 'axios';
import React from 'react';

export function getUserDetails()  {
    return axios.get('https://simplify-code.com/api/auth', {
        withCredentials: true
    })
}