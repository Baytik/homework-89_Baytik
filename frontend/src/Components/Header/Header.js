import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions/userLogAction/userLogAction";
import {apiURL} from "../../apiURL";
import userIcon from './user-icon.jpeg';

class Header extends Component {

    logoOutUserHandler = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <header className="header">
                <div className="logo">
                    <NavLink to="/">Home</NavLink>
                </div>
                <nav className="main-nav">
                    <ul>
                        {this.props.user ? (
                            <>
                                <span>Hello, {this.props.user.firstName || this.props.user.lastName}!</span>
                                {this.props.user.avatar ? (
                                    <img src={apiURL + '/uploads/' + this.props.user.avatar} alt="" className="avatar"/>
                                ) : (
                                    <img src={userIcon} alt="" className="avatar"/>
                                )}
                                <li>
                                    <NavLink to="/track_history">Track History</NavLink>
                                </li>
                                <li>
                                    <p>or</p>
                                </li>
                                <li>
                                    <button onClick={() => this.logoOutUserHandler()}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <p>or</p>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: (user) => dispatch(logoutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);