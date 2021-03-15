import React from 'react';      // Importing React to create Component
import axios from 'axios'; 
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightslategrey',
        border: 'solid 2px tomato'
    }
};

class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},
            menu: [],
            isModalOpen: false,
            order: []
        };
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const restaurantId = queryParams.id;

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getRestaurantById/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                restaurant: result.data.restaurant
            });
        }).catch(error => {
            console.log(error);
        });

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getMenuForRestaurant/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                menu: result.data.menu
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handlePlaceOrder = (e) => {
        // open a modal to show the menu
        this.setState({
            isModalOpen: true
        });
    }

    cancelPayment = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getData = (data) => {
        return fetch(`http://localhost:5000/api/payment`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        });
    }

    obj = (val) => {
        return typeof val === 'object';
    }

    isDate = (val) => {
        return Object.prototype.toString.call(val) === '[object Date]';
    }

    stringifyMyParam = (paramValue) => {
        // check if the paramValue is an object or date, if yes, then stringify
        // else return the value
        if (this.obj(paramValue) && !this.isDate(paramValue)) {
            return JSON.stringify(paramValue);
        } else {
            return paramValue;
        }
    }

    buildForm = (details) => {
        const { action, params } = details;
        // create a form
        // attach an action to the form
        // create fields on the form

        const form = document.createElement('form'); // <form></form>
        form.setAttribute('method', 'post'); // <form method="post"></form>
        form.setAttribute('action', action); // <form method="post" action="action"></form>

        Object.keys(params).forEach(key => {
            const input = document.createElement('input'); // <form method="post" action="action"><input /></form>
            input.setAttribute('type', 'hidden'); // <form method="post" action="action"><input type="hidden"/></form>
            input.setAttribute('name', key);
            input.setAttribute('value', this.stringifyMyParam(params[key]));
            form.appendChild(input);
        });

        return form;
    }

    takeMeToPaymentGateway = (details) => {
        // take user to payment gateway
        // For the procedure of taking the user from our application to payment gateway's website in a secure manner
        // we don't create the HTML element before hand.
        /*
        (1) The HTML form which takes us to paytm gateway is created on the fly (only when it is needed)
        (2) We immediately destroy that form
        */
       const form = this.buildForm(details);
       document.body.appendChild(form);
       form.submit();
       form.remove();
    }

    makePayment = () => {
        /*
        (1) We will have to fetch some coded information from BE server (NodeJS)
        (2) take the coded information / checksum and redirect to paytm gateway page
        (3) From here onwards, everything is taken care by payment gateway
        */
        this.getData({
            amount: 500,
            email: 'abhishek_saini@live.com',
            mobileNo: '9986851333'
        }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response.checkSumResponse
            };
            this.takeMeToPaymentGateway(information);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const { restaurant, isModalOpen, menu } = this.state;
        return (
            <React.Fragment>
                <div className="container mb-5">
                    <img src={restaurant.thumb} alt="restaurant" width="100%" height="500px" className="mt-5"/>
                    <h2 className="mt-3">{restaurant.name}</h2>
                    <div style={{'position': 'absolute', 'right': '160px'}}><button type="button" onClick={this.handlePlaceOrder}>Place online order</button></div>
                    <div className="mt-3">
                        <Tabs>
                            <TabList>
                                <Tab>Overview</Tab>
                                <Tab>Contact</Tab>
                            </TabList>
                            <TabPanel>
                                <h3>About this place</h3>
                                <h4>Cuisine</h4>
                                <div>
                                    {
                                        restaurant.Cuisine && restaurant.Cuisine.length > 0 
                                        ? 
                                        restaurant.Cuisine.map(item => {
                                            return <span>{ item.name }, </span>
                                        }) 
                                        : 
                                        null
                                    }
                                </div>
                                <h4 className="mt-3">Average Cost</h4>
                                <div>{restaurant.cost}</div>
                            </TabPanel>
                            <TabPanel>
                                <h4>Phone Number</h4>
                                <div>(+91) 9986851333</div>
                                <h4 className="mt-3">Address</h4>
                                <h5>{restaurant.name}</h5>
                                <div>{restaurant.address}</div>
                            </TabPanel>
                        </Tabs>
                        <Modal 
                            isOpen={isModalOpen}
                            style={customStyles}>
                            <div>
                                {
                                    menu.map((item, index) => {
                                        return (
                                            <div className="row">
                                                <div className="col-6" style={{'color': 'white'}}>{item.item}</div>
                                                <div className="col-2" style={{'color': 'white'}}>{item.cost}</div>
                                                <div className="col-4"><button>Add</button></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="row mt-3">
                                <div className="float-left">
                                    Sub total: 500
                                </div>
                                <div className="float-right">
                                    <button onClick={this.cancelPayment}>Cancel</button>
                                    <button onClick={this.makePayment}>Pay Now</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Details;

