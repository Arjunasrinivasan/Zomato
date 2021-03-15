import React from 'react';
import '../Styles/search.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurantList: [],
            locationList: [],
            pageCount: [],
            location: undefined,
            cuisine: [],
            mealtype: undefined,
            hcost: undefined,
            lcost: undefined,
            page: 1,
            sort: 1
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype } = qs;
        const req = {
            "mealtype_id": mealtype
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantFilter',
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                mealtype: mealtype,
            })
        }).catch(error => {
            console.log({error});
        })
    }

    handleCuisineChange(cuisineId) {
        const {
            cuisine = [],
            location,
            mealtype,
            hcost,
            lcost,
            sort,
            page
        } = this.state;

        if (cuisine.indexOf(cuisineId.toString()) == -1) {
            cuisine.push(cuisineId.toString());
        } else {
            var index = cuisine.indexOf(cuisineId.toString());
            cuisine.splice(index, 1);
        }

        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype
        }

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantFilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
            })
        }).catch(error => {
            console.log({error});
        });
    }

    handleCostChange() {
        
    }

    render() {
        const { restaurantList, locationList, pageCount, sort } = this.state;
        return(
            <div>
                <div id="myId" className="heading-filter">Breakfast Places in Delhi</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <div className="filter-options">
                                <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                    data-target="#demo"></span>
                                <div id="demo" className="collapse show">
                                    <div className="filter-heading">Filters</div>
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                        <option>Select</option>
                                        {locationList.map((item) => {
                                            return <option value={`${item.location_id}-${item.city_id}`}>{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div>
                                        <input type="checkbox" value="1" onChange={() => this.handleCuisineChange(1)} />
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(2)} />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(3)} />
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(4)} />
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(5)} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 10000)} />
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 10000)} />
                                        <span className="checkbox-items">All</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" checked={sort == 1} onChange={() => this.onSortChange(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" checked={sort == -1} onChange={() => this.onSortChange(-1)} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9 scroll">
                            {
                                restaurantList.length > 0 
                                ? 
                                restaurantList.map(item => {
                                    return <div className="Item" onClick={() => this.handleClick()}>
                                    <div className="row pl-1">
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <img className="img" src={require('../assets/breakfast.png').default} alt=""/>
                                        </div>
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <div className="rest-name">{item.name}</div>
                                            <div className="res-location">{item.locality}, {item.city_name}</div>
                                            <div className="rest-address">{item.address}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row padding-left">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="rest-address">CUISINES : {item.Cuisine.map(itm => itm.name + ', ')}</div>
                                            <div className="rest-address">COST FOR TWO : {item.cost}</div>
                                        </div>
                                    </div>
                                </div>
                                }) 
                                : 
                                <div className="noData"> No Data Found </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Filter;