import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

//create new listing class
class Buy extends Component {
    constructor(){
        super();
        this.state = {
            item: {},
    
        }
    }
    componentDidMount() {
        fetch("/getItemDescription?itemId=" + this.props.itemId)
        .then(response => response.text())
        .then((responseBody) => {
            this.setState({ item: JSON.parse(responseBody) })
        })
    }

    //process all the parameters of an item, but intead of link do a buttom with an Onclick and handleBuy, which will send the data back to the server and update the items bought and items sold functions
    render() {

        return (

            <Link to='/home'>Back</Link>
        )
    }
}

export default Buy;

