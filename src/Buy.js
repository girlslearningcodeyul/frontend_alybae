import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


// crazines --> setInterval(() => NotificationManager.success('Success message', 'Title here'), 500);
//create new listing class
class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            sellerId: "",
            fields: {},
            errors: {}
        }
    }
    componentDidMount() {
        //console.log(this.props.itemId);
        fetch("/getItemDetails?itemId=" + this.props.itemId)
            .then(response => response.text())
            .then((responseBody) => {
                //console.log(responseBody);
                this.setState({ item: JSON.parse(responseBody) })
            })
    }

    createNotification = () => {
        return NotificationManager.success('Success! You bought this wonderful scarf!');
    };

    createNotificationError = () => {
        return NotificationManager.error('Look out! Some form parameters are missing or are incorrect');
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        console.log(fields)
        fields[field] = e.target.value;
        console.log(fields[field])
        this.setState({ fields });
    }

    //the form validates that all the parameters exist
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }
        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        //console.log(formIsValid);
        //console.log(fields["name"]);
        return formIsValid;
    }

    handleBuy = (e) => {
        e.preventDefault();
        if (!this.handleValidation()) {
            return this.createNotificationError();
        }
        else {
            fetch('/buyItem?itemId=' + this.props.itemId + '&userId=' + this.props.username)
                .then(response => response.text())
                .then(responseBody => {
                    this.props.historyPush('/account');
                    this.createNotification();
                })
        }
    }
    //hey ksenia! this is so coooool! this is the nerdiest chat ever i love it
    //lets investigate. yeah it really looks perfect, let me think
    //maybe it wont make sense but have you tried returning something in your if statements?
    //wow that is an interesting function, the match one on 49
    //hi rob! I feel kind of creepy when I watch you making changes...o
    //yes awesome job!!!! I am getting ready for rehearsal, banjo banjo m baanjo... 
    //i am gonna watch a tutorial on regex - oh yeah I totally used the gi thing before on code wars


    //hey Aly! woot! yesh. who needs chat! Totes! 
    //now what?
    // I really really really want to get the check fields function to work.... uggghhhh but it's so uncooperative
    //I cant' seem to do the right check for an empty field (on lines 43 and 49)
    //rob says hi!!
    // OH GAAAAAAWD!!! finally!
    //figured it! 
    //oh year, the match method is using regex as an input
    //[^a-zA-Z] means catch any character that IS NOT a-z OR A-Z
    //it's super powerful, but kind of cryptic:)

    render() {
        return (
            <div>
                <div className="banner1">
                    <Link className="logo" to='/home'></Link>
                    <Link className="homeAllListingsLink" to='/allListings'>ALL LISTINGS</Link>
                    <Link className="homeAccountLink" to='/account'>YOUR ACCOUNT</Link>
                    <Link className="homeCreateListingsLink" to='/create'>CREATE A LISTING</Link>
                    <div className="homeLogoutLink"><a href="" onClick="window.location.reload(true)">LOGOUT</a></div>
                </div>
                <div className="buyPage">
                    <div className="orderSummary"> {/*the order summary div*/}
                        {!this.state.item ? <div className="loading"><h1>Loading...</h1></div> : (
                            <div>
                                <div className="orderText">Order Summary:</div>
                                <div className="listingStyle">
                                    <img src={this.state.item.imageLocation} alt="" />
                                    {this.state.item.name} <br /><br />
                                    {this.state.item.description}<br />
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
                        <div className="buyInputs">
                            <div>
                                <input className="justInputs"
                                    type="text"
                                    placeholder="first name"
                                    ref="name"
                                    onChange={this.handleChange.bind(this, "name")}
                                    value={this.state.fields["name"]}
                                />
                                <input className="justInputs" placeholder="last name" />
                            </div>
                            <div><input className="justInputs" placeholder="address" /><input className="justInputs" placeholder="city" /></div>
                            <div><select>
                                <option value="">Select Province</option>
                                <option value="AB">Alberta</option>
                                <option value="BC">British Columbia </option>
                                <option value="03">Ontario</option>
                                <option value="04">Quebec</option>
                                <option value="05">Saskatchewan</option>
                                <option value="06">Manitoba</option>
                                <option value="07">PEI</option>
                                <option value="08">Newfoundland</option>
                                <option value="09">Nova Scotia</option>
                                <option value="10">New Brunswick</option>
                                <option value="11">Yukon</option>
                                <option value="12">Northwest Territories</option>
                                <option value="12">Nunavut</option>
                            </select>
                                <input className="justInputs" placeholder="zip/postal code" /></div>
                            <div><input className="justInputs" placeholder="country" /></div>
                            <div><input type="text"
                                refs="email"
                                className="justInputs"
                                placeholder="enter e-mail"
                                onChange={this.handleChange.bind(this, "email")}
                                value={this.state.fields["email"]}
                            /></div>
                        </div>
                        <div>
                            payment information:
                    </div>
                        <div className="buyInputs">
                            <input className="justInputs" placeholder="card holder" /> <input className="justInputs" placeholder="credit card number" />
                        </div>
                        <div className="buyInputs">
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
                        <button className='btn-success' onClick={this.handleBuy.bind(this)}>Buy now! </button>
                    </div>

                </div>
                {/*the last div*/}
            </div>
        )
    }
}

export default Buy;

