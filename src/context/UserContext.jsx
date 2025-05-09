import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Importing the jwtDecode function from the jwt-decode library
import axios from 'axios';

// Creating a context to manage user profile data
export const UserContext = createContext('');

export const UserController = ({ children }) => {

    const navigate = useNavigate(); // Initializing the navigate function from react-router-dom
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track user authentication status
    const [error, setError] = useState(''); // State to handle errors
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [favoriteGames, setFavoriteGames] = useState([]); // State to store user's favorite games
    const [details, setDetails] = useState({}); // State to store user details
    const [recoGames, setRecoGames] = useState([]); // State to store recommended games
    const [userGenres, setUserGenres] = useState([]); // State to store user's preferred genres
    const [userPlatform, setUserPlatform] = useState([]); // State to store user's preferred platforms

    // API key retrieved from environment variables
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Function to register a new user
    const register = (obj) => {
        return axios.post('https://game-den-back.onrender.com/api/register', {
            lastname: obj.lastname,
            firstname: obj.firstname,
            pseudo: obj.pseudo,
            email: obj.email,
            password: obj.password
        })
        .then(res => console.log('Registered'))
        .catch(error => {
            throw error;
        });
    }

    // Function to login a user
    const login = (user) => {
        return axios.post('https://game-den-back.onrender.com/api/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data); // Storing the user token in local storage
            return res.data;
        });
    }

    // Function to fetch user profile data
    const getProfil = async () => {
        try {
            const token = await localStorage.usertoken; // Retrieving user token from local storage
            
            const decoded = await jwtDecode(token); // Decoding the user token
            
            // Fetching user data based on decoded user ID
            const userData = await axios.get(`https://game-den-back.onrender.com/api/users/${decoded.id}`);
            setDetails({ ...userData.data, id: decoded.id });
            
            // Fetching user's favorite games based on decoded user ID
            const response = await axios.get(`https://game-den-back.onrender.com/api/users/${decoded.id}/games`);
            const favorites = response.data;
            setFavoriteGames(favorites);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProfil();
    }, [isAuthenticated, userGenres, userPlatform]);

    // Checking if user is authenticated when component mounts
    useEffect(() => {
        const jwt = localStorage.getItem('usertoken');
        if (jwt) {
            setIsAuthenticated(true);
        }
    }, []);

    return(
        <UserContext.Provider value={{ 
            value1: [details, setDetails], 
            value2: [getProfil], 
            value3: [login, register], 
            value4: [isAuthenticated, setIsAuthenticated], 
            value5: [error, isLoading], 
            value6: [favoriteGames, setFavoriteGames], 
            value7: [recoGames, setRecoGames], 
            value8: [userGenres, setUserGenres],
            value9: [userPlatform, setUserPlatform] 
        }}>
            { children }
        </UserContext.Provider>
    )
}
