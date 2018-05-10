import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Email, Item, Span, A } from 'react-html-email' //have to install

import './App.css';


//create new listing class
class Buy extends Component {
    constructor() {
        super();
        this.state = {
            item: null,
            sellerId: ""
        }
    }
    componentDidMount() {
        console.log(this.props.itemId);
        fetch("/getItemDetails?itemId=" + this.props.itemId)
            .then(response => response.text())
            .then((responseBody) => {
                console.log(responseBody);
                this.setState({ item: JSON.parse(responseBody) })
            })
    }

    //testing sendind an email
    handleEmail = () => {
        <Email title="Hello World!">
            <Item align="center">
                <Span fontSize={20}>
                    This is an example email made with:
          <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
        </Span>
            </Item>
        </Email>
    }

    handleBuy = (e) => {
        e.preventDefault();
        fetch('/buyItem?itemId=' + this.props.itemId + '&userId=' + this.props.username)
            .then(response => response.text())
            .then(responseBody => {
                console.log("successfully sent")
                this.props.historyPush('/account');
            })
    }

    render() {

        return (
            <div>
                <div className="banner1">
                    <Link to='/home'>Home</Link>
                </div>
                <div>
                    <form>
                        <div>
                            shipping information:
                            </div>
                        <div>
                            <input placeholder="first name" />
                            <input placeholder="last name" />
                            <input placeholder="address" />
                            <input placeholder="city" />
                            <input placeholder="state/province" />
                            <input placeholder="zip/postal code" />
                            <input placeholder="country" />
                            <input placeholder="e-mail" />
                        </div>

                        <div>
                            payment information:
                            </div>
                        <div>
                            <input placeholder="card holder" />
                            <input placeholder="cc" />
                            <input placeholder="month" />
                            <input placeholder="year" />
                            <input placeholder="CVV" />
                            <input onClick={this.handleEmail} type="submit" ></input>
                        </div>

                    </form>
                </div>
                <div>
                    {!this.state.item ? <div classname="loading"><h1>Loading...</h1></div> : (
                        <div className="listingStyle"> Order Summary:
                            Name: {this.state.item.name} <br />
                            Description: {this.state.item.description}<br />
                            Price: {this.state.item.price} <br />
                            Sold by: {this.state.item.sellerId} <br />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Buy;

