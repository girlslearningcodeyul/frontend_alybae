import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


// crazines --> setInterval(() => NotificationManager.success('Success message', 'Title here'), 500);
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

    handleBuy = (e) => {
        e.preventDefault();
        fetch('/buyItem?itemId=' + this.props.itemId + '&userId=' + this.props.username)
            .then(response => response.text())
            .then(responseBody => {
                //console.log("successfully sent")
                this.props.historyPush('/account');
                this.createNotification();
            })
    }

    createNotification = () => {
        return NotificationManager.success('Success! You bought this thing!', 'Title here');
    };


    render() {

        return (
            <div>
                <div className="banner1">
                    <Link to='/home'>Aly-bae</Link>
                </div>
                <div className="buyPage">
                    <div className="orderSummary"> {/*the order summary div*/}
                        {!this.state.item ? <div classname="loading"><h1>Loading...</h1></div> : (
                            <div>
                                <div className="orderText">Order Summary:</div>
                                <div className="listingStyle">
                                    <img src={this.state.item.imageLocation} alt="" />
                                    Name: {this.state.item.name} <br />
                                    Description: {this.state.item.description}<br />
                                    $ {this.state.item.price} <br />
                                    Sold by: {this.state.item.sellerId} <br />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="paymentForm">
                        <div>
                            shipping information:
                    </div>
                        <div className = "buyInputs">
                            <div><input className="justInputs" placeholder="first name" /><input className="justInputs" placeholder="last name" /></div>
                            <div><input className="justInputs" placeholder="address" /><input className="justInputs" placeholder="city" /></div>
                            <div><input className="justInputs" placeholder="state/province" /><input className="justInputs" placeholder="zip/postal code" /></div>
                            <div><input className="justInputs" placeholder="country" /><input className="justInputs" placeholder="e-mail" /></div>
                        </div>
                        <div>
                            payment information:
                    </div>
                        <div className = "buyInputs">
                            <input className="justInputs" placeholder="card holder" /> <input className="justInputs" placeholder="credit card number" />
                        </div>
                        <div className = "buyInputs">
                            <select>
                                <option value="01">January</option>
                                <option value="02">February </option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select>
                                <option value="18"> 2018</option>
                                <option value="19"> 2019</option>
                                <option value="20"> 2020</option>
                                <option value="21"> 2021</option>
                                <option value="22"> 2022</option>
                            </select>
                            <input className="justInputs" placeholder="CVV" />
                        </div>
                        <button className='btn-success' onClick={this.handleBuy}>Buy now! </button>
                    </div>

                </div>
                {/*the last div*/}
            </div>
        )
    }
}

export default Buy;

