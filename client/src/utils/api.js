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
    return axios.get('https://simplify-code.com/api/staff', {
        withCredentials: true
    })
}

export function getPanelUsers() {
    return axios.get('https://simplify-code.com/api/panel/users', {
        withCredentials: true
    })
}

export function getPanelUser(match) {
    return axios.get(`https://simplify-code.com/api/panel/users/${match.params.id}`, {
        withCredentials: true
    })
}

export function getPanelPerms(id) {
    return axios.get(`https://simplify-code.com/api/panel/perms/${id}`, {
        withCredentials: true
    })
}