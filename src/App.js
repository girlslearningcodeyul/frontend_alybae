import React, { Component } from 'react';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            itemsBought: []
        }
    }
    itemsBought = () => {
        fetch('/itemsBought')
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }


    render() {
        return (
            <div>
                <button onClick={this.itemsBought}>Show Items Bought</button>
            </div>
        );
    }


}

export default App;
