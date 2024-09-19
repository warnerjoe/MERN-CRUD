import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register User by sending request to /api/users, when the response comes back if it has response.data, save it to localStorage and return it.
const register = async(userData) => {
    const response = await axios.post(API_URL, userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Log in user by sending request to /api/users/login, when you receive a response, save it to local storage and return the response.data
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Logout user by removing the user from localStorage.
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login,
};

export default authService;