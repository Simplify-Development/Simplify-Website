import axios from 'axios';
import React from 'react';

export function getUserDetails()  {
    return axios.get('https://simplify-code.com/api/auth', {
        withCredentials: true
    })
}

export function getWhitelistStatus(userId) {
    return axios.get(`https://simplify-code.com/api/checkperms/${userId}`, {
        withCredentials: true
    })
}

export function getStaffList() {
    return axios.get('http://localhost:5001/api/staff', {
        withCredentials: true
    })
}