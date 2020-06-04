import { API } from '../config';

export const signup = (user) => {
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...user
        })
    })
        .then(resp => resp.json())
        .catch(console.error)
};

export const signin = (user) => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...user
        })
    })
        .then(resp => resp.json())
        .catch(console.error)
};

// middleware principle
export const setAuthInfo = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('insta_jwt', JSON.stringify(data));
    }
    next();
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('insta_jwt')
    }
    next();
    fetch(`${API}/auth/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response)
        })
        .catch(console.error)
};

// export const isAuthenticated = () => {
//     if (typeof window == 'undefined') {
//         return false
//     };
//     const formStorage = localStorage.getItem('insta_jwt');
//     if (formStorage) {
//         return JSON.parse(formStorage)
//     } else {
//         return false
//     };
// };

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    };
    const formStorage = localStorage.getItem('insta_jwt');
    if (formStorage) {
        return JSON.parse(formStorage)
    } else {
        return false
    };
};