import axios from 'axios';
import React from 'react';

export function getUserDetails()  {
    return axios.get('https://simplify-website.herokuapp.com/api/auth', {
        withCredentials: true
    })
}