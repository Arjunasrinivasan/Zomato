import React from 'react';
import '../Styles/header.css';
import axios from 'axios';

class Transaction extends React.Component {
    constructor() {
        this.status = {
            paymentStatus: ""
        };
    }

    componentDidMount() {
        // Capture the post data from Paytm and then
        // Make an API call to '/api/callback'
    }

    render() {
        const { paymentStatus } = this.state;
        return (
            <React.Fragment>
                <h1>Trasaction Status</h1>
                <h2>{ paymentStatus }</h2>
            </React.Fragment>
        )
    }
}

export default Transaction;