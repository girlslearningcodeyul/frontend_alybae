import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//create new listing class
class Create extends Component {
    constructor() {
        super();
        this.state = {
            sellerId: "",
            price: 0,
            description: "",
            name: "",
            fileName: ""
        }
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }
    handleDesc = (e) => {
        this.setState({ description: e.target.value })
    }
    handlePrice = (e) => {
        this.setState({ price: e.target.value })
    }

    handleCreateListing = (e) => {
        e.preventDefault();
        console.log(this.state)
        let body = JSON.stringify({ //sending this to the backend and names have to match
            sellerId: this.props.username,//the name of the seller
            price: this.state.price,
            description: this.state.description,
            name: this.state.name,
            imageLocation: this.state.fileName
        })

        fetch('/newListing', { method: "POST", body: body })
            .then(response => response.text())
            .then(responseBody => {
                console.log("successfully sent");
                this.props.historyPush('/allListings');
            })
    }

    uploadFile = (x) => {
        var filename = x.name;
        var fileExtension = filename.split('.').pop();
        fetch('/uploadPics?ext=' + fileExtension, { method: "POST", body: x })
            .then((response) => response.json())
            .then((responseBody) =>
                this.setState({ fileName: responseBody }))
        // 
    }

    createListing = () => {
        return (
            <div className="listingForm">Create a Listing:
                <form onSubmit={this.handleCreateListing}>
                <div>
                        Item Name:
                        <input type="text" className="justInputs" placeholder="name your item"
                            onChange={this.handleName}
                            value={this.name}>
                        </input>
                        <div></div>
                        Description:
                        <input type="text" className="justInputs" placeholder="describe it"
                            onChange={this.handleDesc}
                            value={this.description}>
                        </input>
                        <div></div>
                        Enter Price:
                        <input type="text" className="justInputs" placeholder="how much or free?"
                            onChange={this.handlePrice}
                            value={this.price}>
                        </input>
                        <div>Upload an image:</div>
                        
                        <input type="file" id="input" onChange={e => this.uploadFile(e.target.files[0])} />
                    </div>
                    <input className="submitButton" type="submit" ></input>
                </form>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="banner1">
                    <Link className="createItemHomeLink" to='/home'>Aly-bae</Link>
                    <Link className="homeAccountLink" to='/account'>Your account</Link>
                    <Link className="homeAllListingsLink" to='/allListings'>All listings</Link>  
                </div>
                <div><a href="" onClick="window.location.reload(true);">Logout</a></div>
                
                <div>
                    <div className="createListing">{this.createListing()}</div>
                </div>
            </div>

        )
    }

}

export default Create;

