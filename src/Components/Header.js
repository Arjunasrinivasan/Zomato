import React from 'react';
import '../Styles/header.css';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightslategrey',
        border: 'solid 2px tomato'
    }
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            isSigninModalOpen: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            isLoggedIn: false
        };
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
    }

    signUpHandler = (event) => {
        const { 
            email,
            password,
            firstname,
            lastname
        } = this.state;

        const signUpRequestObj = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/signup',
            headers: {'Content-Type': 'application/json'},
            data: signUpRequestObj
        }).then(
            response => {
                if (response.data.message == 'User signed up successfully !') {
                    this.setState({
                        isModalOpen: false,
                        email: '',
                        password: '',
                        firstname: '',
                        lastname: ''
                    });
                    alert(response.data.message);
                }
            }
        ).catch(
            error => {
                console.log(error);
                alert(error);
            }
        )
    }

    loginHandler = (event) => {
        const { 
            email,
            password
        } = this.state;

        const loginRequestObj = {
            email: email,
            password: password
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/login',
            headers: {'Content-Type': 'application/json'},
            data: loginRequestObj
        }).then(
            response => {
                if (response.data.user.length >= 1) {
                    this.setState({
                        isSigninModalOpen: false,
                        email: '',
                        password: '',
                        isLoggedIn: response.data.isAuthenticated,
                        firstname: response.data.user[0].firstname
                    });
                    sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated);
                }
            }
        ).catch(
            error => {
                console.log(error);
                alert(error);
            }
        )
    }

    cancelHandler = (event) => {
        this.setState({
            isModalOpen: false,
        });
    }

    signUpOpenHandler = (event) => {
        this.setState({
            isModalOpen: true,
        });
    }

    signInOpenHandler = (event) => {
        this.setState({
            isSigninModalOpen: true,
        })
    }

    cancelLoginHandler = (event) => {
        this.setState({
            isSigninModalOpen: false,
        })
    }

    logoutHandler = (event) => {
        this.setState({
            firstname: '',
            isLoggedIn: false
        });
        sessionStorage.setItem('isLoggedIn', false);
    }

    render() {
        const { 
            isModalOpen,
            isSigninModalOpen,
            email,
            password,
            firstname,
            lastname,
            isLoggedIn
         } = this.state;
        return (
            <React.Fragment>
                <div className="header">
                    <div className="btn-group login-block">
                        {
                            isLoggedIn 
                            ? 
                            <div>
                                <span>{firstname}</span>
                                <button className="btn btn-sm btn-primary ml-3" onClick={this.logoutHandler}>Logout</button>
                            </div>
                            :
                            <div>
                                <button className="btn btn-sm text-white" onClick={this.signInOpenHandler}>Login</button>
                                <button className="btn btn-sm btn-primary ml-3" onClick={this.signUpOpenHandler}>Signup</button>
                            </div>
                        }
                    </div>
                    <Modal 
                        isOpen={isModalOpen}
                        style={customStyles}>
                        <div>
                            <h3>Signup User</h3>
                            <div>
                                <span>Email : </span>
                                <input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')}></input>
                            </div>
                            <div>
                                <span>Password : </span>
                                <input type="password" value={password} onChange={(event) => this.handleChange(event, 'password')}></input>
                            </div>
                            <div>
                                <span>First Name : </span>
                                <input type="text" value={firstname} onChange={(event) => this.handleChange(event, 'firstname')}></input>
                            </div>
                            <div>
                                <span>Last Name : </span>
                                <input type="text" value={lastname} onChange={(event) => this.handleChange(event, 'lastname')}></input>
                            </div>
                            <button onClick={this.signUpHandler} class="btn btn-sm btn-primary">Signup</button>
                            <button onClick={this.cancelHandler} class="btn btn-sm btn-primary">Cancel</button>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={isSigninModalOpen}
                        style={customStyles}>
                        <div>
                            <h3>Login User</h3>
                            <div>
                                <span>Email : </span>
                                <input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')}></input>
                            </div>
                            <div>
                                <span>Password : </span>
                                <input type="password" value={password} onChange={(event) => this.handleChange(event, 'password')}></input>
                            </div>
                            <button onClick={this.loginHandler} class="btn btn-sm btn-primary">Login</button>
                            <button onClick={this.cancelLoginHandler} class="btn btn-sm btn-primary">Cancel</button>
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default Header;