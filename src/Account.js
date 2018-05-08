import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Account extends Component {

    itemsBought = () => {
        fetch('/itemsBought')
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }
    render() {
        return (
            <Link to ='/home'>Back</Link>
        )
    }
}

export default Account;

