import React, { Component } from 'react';
import './App.css';


class App extends Component {
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
                    let password = parsed.password
                    let sessionID = parsed.sessionID
                    this.setState({ username, password, sessionID })
                }
            })
    }

    itemsBought = () => {
        fetch('/itemsBought')
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }

    renderLoginForm = () => {
        return (<div className="loginDiv"> login:
          <form onSubmit={this.handleLoginSubmit}>
                <div>username:
            <input type="text"
                        onChange={this.handleUsernameChange}
                        value={this.inputUsernameValue}>
                    </input>
                </div>
                <div>
                    password:
            <input type="text"
                        onChange={this.handlePasswordChange}
                        value={this.inputPasswordValue}>
                    </input>
                </div>
                <input type="submit" ></input>
            </form>
        </div>)
    }

    renderCreateAccountForm = () => {
        return (<div className="accountDiv"> sign up:
        <form onSubmit={this.handleCreateAccount}>
                <div>new username:
              <input type="text"
                        onChange={this.handleUsernameCreate}
                        value={this.inputUsernameCreate}>
                    </input>
                </div>
                <div>
                    new password:
          <input type="text"
                        onChange={this.handlePasswordCreate}
                        value={this.inputPasswordCreate}>
                    </input>
                </div>
                <input type="submit" ></input>
            </form>
        </div>)
    }
    render() {
        if (this.state.loginFailed) {
            return (<h1>Login Failed!</h1>)
        }
        else {
            return (
                <div><h1>AlyBae</h1>
                    <div className="accountsPage">
                        <div className="login">
                            {this.renderLoginForm()}</div>
                        <div className="create">
                            {this.renderCreateAccountForm()}</div>
                    </div>
                </div>
            );
        }
    }
}

export default App;
