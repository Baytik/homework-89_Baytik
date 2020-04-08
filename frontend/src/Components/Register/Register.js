import React, {Component} from 'react';
import './Register.css';
import {postRegister} from "../../store/actions/userLogAction/userLogAction";
import {connect} from "react-redux";

class Register extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        avatar: null
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};
    fileChangeHandler = e => {this.setState({[e.target.name]: e.target.files[0]})};

    newUser = async () => {
        const User = new FormData();
        User.append('username', this.state.username);
        User.append('password', this.state.password);
        User.append('avatar', this.state.avatar);
        User.append('firstName', this.state.firstName);
        await this.props.postRegister(User);
    };

    render() {
        return (
            <div className="register">
                <p>Register</p>
                <div>
                    <input type="text" placeholder="Write email" name="username" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write password" name="password" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write display name" name="firstName" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="file" name="avatar" onChange={this.fileChangeHandler}/>
                </div>
                <div>
                    <button onClick={this.newUser}>Register</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postRegister: (user) => dispatch(postRegister(user)),
});

export default connect(null, mapDispatchToProps)(Register);