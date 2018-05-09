import React, { Component } from 'react';
import './App.css';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            itemsBought: [],
            inputUsernameValue: "",
            inputPasswordValue: "",
            inputUsernameCreate: "",
            inputPasswordCreate: ""
        }
    }

    // sets state to the input username at login
    handleUsernameChange = (e) => {
        this.setState({ inputUsernameValue: e.target.value })
    }

    // sets state to the input password at login
    handlePasswordChange = (e) => {
        this.setState({ inputPasswordValue: e.target.value })
    }
    //sets state to the input username at create account
    handleUsernameCreate = (e) => {
        this.setState({ inputUsernameCreate: e.target.value })
    }
    //sets state to the input password at creat account
    handlePasswordCreate = (e) => {
        this.setState({ inputPasswordCreate: e.target.value })
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        let body = JSON.stringify({
            username: this.state.inputUsernameValue,
            password: this.state.inputPasswordValue
        })

        fetch('/login', { method: "POST", body: body })
            .then(response => response.text())
            .then(responseBody => {
                let parsed = JSON.parse(responseBody)
                let sessionID = parsed.sessionID
                if (sessionID) {
                    this.setState({ sessionID: sessionID })
                    this.props.setUsername(this.state.inputUsernameValue); //call the App method setUsername to check whether it is defined and could be used as a parameter in App.js
                    this.props.historyPush('/home');
                }
                else {
                    this.setState({ loginFailed: "true" })
                }
            })
    }

    handleCreateAccount = (e) => {
        e.preventDefault();
        let body = JSON.stringify({
            username: this.state.inputUsernameCreate,
            password: this.state.inputPasswordCreate
        })
        fetch('/createAccount', { method: "POST", body: body })
            .then(response => response.text())
            .then(responseBody => {
                let parsed = JSON.parse(responseBody)
                if (typeof (parsed) === 'string') { //checking if the response is a string and if it is that means the message is error
                    alert(parsed);
                } else {
                    let username = parsed.username
                    this.props.setUsername(username); //call the App method setUsername to check whether it is defined and could be used as a parameter in App.js
                    this.props.historyPush('/home');
                }
            })
    }



    renderLoginForm = () => {
        return (<div className="loginDiv"> Login:
          <form onSubmit={this.handleLoginSubmit}>
                <div><input className="input" type="text" placeholder="username"
                    onChange={this.handleUsernameChange}
                    value={this.inputUsernameValue}>
                </input>
                </div>
                <div>
                    <input className="input" type="text" placeholder="password"
                        onChange={this.handlePasswordChange}
                        value={this.inputPasswordValue}>
                    </input>
                </div>
                <input className="loginSubmitButton" type="submit" ></input>
            </form>
        </div>)
    }

    renderCreateAccountForm = () => {
        return (<div> <span>not a member?</span> Sign Up:
        <form onSubmit={this.handleCreateAccount}>
                <div><input className="input" type="text" placeholder=" new username"
                    onChange={this.handleUsernameCreate}
                    value={this.inputUsernameCreate}>
                </input>
                </div>
                <div>
                    <input className="input" type="text" placeholder=" new password"
                        onChange={this.handlePasswordCreate}
                        value={this.inputPasswordCreate}>
                    </input>
                </div>
                <input className="createSubmitButton" type="submit" ></input>
            </form>
        </div>)
    }
    render() {
        if (this.state.loginFailed) {
            return (<h1>Login Failed!</h1>)
        }
        else {
            return (

                <body className="banner">
                    <div className="wall"> </div>
                    <div><h1 className="title">AlyBae</h1>
                        <div>
                            <div className="login">
                                {this.renderLoginForm()}</div>
                            <div className="signUp">
                                {this.renderCreateAccountForm()}</div>
                        </div>
                    </div>
                </body>

            );
        }
    }
}

export default Login;
