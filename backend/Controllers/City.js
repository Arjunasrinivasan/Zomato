const city = require('../Models/City');

const restaurantList = require('../Models/Restaurant');

exports.getCityList = (req, res) => {
    // fetch the data from MongoDB using the City model
    city.find().then(result => {
        res.status(200).json({
            message: "City list fecthed successfully",
            cities: result
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}

exports.getRestaurantsByCity = (req, res) => {
    restaurantList.find({ 
        city: req.params.city.toString()
    }).then(result => {
        res.status(200).json({
            restaurants:  result,
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}