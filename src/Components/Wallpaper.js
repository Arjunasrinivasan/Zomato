
import React, { Component } from 'react';
import homepageimg from '../assets/homepageimg.png';
import axios from  'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            text: '',
            restaurants: []
        };
    }

    componentDidMount() {

    }

    handleChange = (event) => {
        const cityId = event.target.selectedOptions[0].value;
        sessionStorage.setItem("city", cityId);
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getRestaurantsByCity/${cityId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                restaurants: result.data.restaurants
            });
        }).catch(error => {
            console.log(error)
        });
    }

    onTextChanged = (event) => {
        // filter the restaurants based on my text in the search box
        const searchInput = event.target.value;

        const { restaurants } = this.state;

        let suggestions = [];

        if (searchInput.length > 0) {
            suggestions = restaurants.filter(
                item => item.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        this.setState({
            suggestions,
            text: searchInput
        });
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length == 0) {
            return null;
        }
        return (
            <ul className="suggestionsBox">
                {
                    suggestions.map((item, index) => {
                        return (
                            <li key={index} onClick={() => this.selectRestaurant(item)} value={item}>{  `${item.name}, ${item.city}`  }</li>
                        )
                    })
                }
            </ul>
        )
    }

    selectRestaurant = (item) => {
        // take the user to restaurant details page
        this.props.history.push(`/restaurant?id=${item._id}`)
    }

    render() {
        const { cities } = this.props;
        const { text } = this.state;
        return (
            <React.Fragment>
                <img src={homepageimg} alt="" style={{ width: '100%', height: '450px', margin: 'auto' }} />
                <div>
                    <div className="logo">
                        <p>e!</p>
                    </div>
                    <div className="headings">
                        Find the best restaurants, cafes, bars
                    </div>
                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleChange}>
                            <option value="select" selected disabled>Please select a city</option>
                            {
                                cities.map((city, index) => {
                                    return <option key={index} value={city.city_id}>{city.name}</option>
                                })
                            }
                        </select>
                        <div class="suggestions-func">
                            <span className="gylphicon glyphicon-search"></span>
                            <input className="restaurantsinput" type="text" value={text} placeholder=" Search for restaurants" onChange={this.onTextChanged}/>
                            {
                                this.renderSuggestions()
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Wallpaper);