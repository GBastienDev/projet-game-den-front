// Importing necessary modules and styles
import './Login.scss'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { addActiveClass, removeActiveClass } from './utils';
import back from '../../assets/back.svg'

// Login component definition
const Login = () => {
    // Accessing user context
    const { value3, value4 } = useContext(UserContext);
    const [login, register] = value3;
    const [isAuthenticated, setIsAuthenticated] = value4;

    // State variables for user data
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State variables for error messages
    const [errorLogin, setErrorLogin] = useState('');
    const [errorRegister, setErrorRegister] = useState('');

    // Navigation hook
    const navigate = useNavigate();

    // Function to create a new user
    const createUser = (e) => {
        e.preventDefault();

        const newUser = { 
            lastname: lastName,
            firstname: firstName,
            pseudo: pseudo,
            email: email,
            password: password
        };

        register(newUser)
            .then(res => { 
                // Clearing input fields and error message on successful registration
                setLastName("");
                setFirstName("");
                setPseudo("");
                setEmail("");
                setPassword("");
                setErrorRegister("");
            })
            .catch(error => {
                console.log('Register error:', error)
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorRegister(error.response.data.error);
                } else {
                    setErrorRegister('An error occurred. Please try again later.');
                }
            });
    };    

    // Function to login user
    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        login(user)
            .then(res => {
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorLogin(error.response.data.error);
                } else {
                    setErrorLogin('An error occurred. Please try again later.');
                }
            });
    };

    // State variable for toggling between login and register forms
    const [isRegisterActive, setRegisterActive] = useState(true);

    // Function to handle click event for register form
    const handleRegisterClick = () => {
        addActiveClass('container');
        addActiveClass('back__link');
    };

    // Function to handle click event for login form
    const handleLoginClick = () => {
        removeActiveClass('container');
        removeActiveClass('back__link');
    };

    // Rendering JSX
    return(
        <div className="container-page">
            <div className="container" id="container">
                {/* Register form */}
                <div className="form-container sign-up">
                    <form className="container__form" noValidate onSubmit={createUser}>
                        <h1 className="container__title">Create an account</h1>
                        <p className="container__text">Enter your information to register</p>
                        {errorRegister && <p className="error-message">{errorRegister}</p>}
                        <input className="container__input" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        <input className="container__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="container__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="container__button" type="submit">SIGN UP</button>                   
                    </form>
                </div>

                {/* Login form */}
                <div className="form-container sign-in">
                    <form className="container__form" noValidate onSubmit={userLogin}> 
                        <h1 className="container__title">Already have an account?</h1>
                        <p className="container__text">Login with your email address</p>
                        <input className="container__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="container__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="container__button" type="submit">LOGIN</button>
                        {errorLogin && <p className="error-message">{errorLogin}</p>}
                    </form>
                </div>

                {/* Back button */}
                <Link to="/">
                    <img className="back__link" id="back__link" src={back} alt="back home" />
                </Link>

                {/* Toggle between login and register forms */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle__panel toggle-left">
                            <h1 className="toggle__title">Welcome back!</h1>
                            <p className="toggle__text">Enter your login credentials</p>
                            <button className="container__button hidden" id="login" onClick={handleLoginClick}>LOGIN</button>
                        </div>
                        <div className="toggle__panel toggle-right">
                            <h1 className="toggle__title">Welcome!</h1>
                            <p className="toggle__text">Register your personal data</p>
                            <button className="container__button hidden" id="register" onClick={handleRegisterClick}>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
