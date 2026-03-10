import axios from 'axios';
import { BASE_API } from '../../../constant.js';

export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_API}/user/register`, data);
        console.log(response);
    } catch (error) {
        console.log(error);
        console.log('Somethin went wrong');
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${BASE_API}/user/login`, data, {withCredentials: true});
        console.log(response);
    } catch (error) {
        console.log('Something went wrong:', error);
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${BASE_API}/user/logout`);
        console.log(response);
    } catch (error) {
        console.log('Somethin went wrong: ', error);
    }
};

export const refresh = async () => {
    try {
        const response = await axios.post(`${BASE_API}/user/refresh`)
        console.log(response)
    } catch (error) {
        console.log('Something went wrong: ', error)
    }
}