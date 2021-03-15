import React, { Component } from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearches from './QuickSearches';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            cities: [],
            mealtypes: []
        };
    }

    componentDidMount() {
        document.title = "My own title";
        axios.get('http://localhost:5000/api/cityList')
        .then(result => {
            this.setState({
                cities: result.data.cities
            });
        }).catch(error => {
            console.log(error);
        });
        
        axios.get('http://localhost:5000/api/mealtype')
        .then(result => {
            this.setState({
                mealtypes: result.data.mealtype
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const { cities, mealtypes } = this.state;
        return (
            <React.Fragment>
                <Wallpaper cities={cities} />
                <QuickSearches mealtypes={mealtypes}/>
            </React.Fragment>
        );
    }
}

export default Home;