import { createAuthHeaders } from '../API/userManager';

const baseUrl = '/api/v1';

export const getListOfUsers = (q) => {
    return fetch(`${baseUrl}/users?q=${q}`)
        .then(response => response.json())
};

export const getSpecificUser = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/users/${id}`, {
        headers: authHeader
    })
        .then(response => response.json())
}


export const getCowriters = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/CowriterSongRels/${id}`, {
        headers: authHeader
    })
        .then(response => response.json())
};

export const addCowriter = (cowriterSongRel) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/cowriterSongRels/create`, {
        headers: authHeader,
        method: 'POST',
        body: JSON.stringify(cowriterSongRel)
    })
        .then(response => response.json())
}