import axios from 'axios';
import React from 'react';

export function getUserDetails()  {
    return axios.get('http://localhost:5001/api/auth', {
        withCredentials: true
    })
}

export function getWhitelistStatus(userId) {
    return axios.get(`http://localhost:5001/api/checkperms/${userId}`, {
        withCredentials: true
    })
}

export function getStaffList() {
    return axios.get('http://localhost:5001/api/staff', {
        withCredentials: true
    })
}

export function getPanelUsers() {
    return axios.get('http://localhost:5001/api/panel/users', {
        withCredentials: true
    })
}

export function getPanelUser(match) {
    return axios.get(`http://localhost:5001/api/panel/users/${match.params.id}`, {
        withCredentials: true
    })
}

export function getPanelPerms(id) {
    return axios.get(`http://localhost:5001/api/panel/perms/${id}`, {
        withCredentials: true
    })
}