
const Restaurant = require('../Models/Restaurant');

exports.filter = (req, res) => {
    //const location_id = req.body.location_id;
    const mealtype_id = req.body.mealtype_id;
    const cuisine_ids = req.body.cuisine_ids;
    //const city_id = req.body.city_id;
    //const cost = req.body.cost;
    //const page = req.body.page;

    let payload = {
        'type.mealtype': mealtype_id
    }

    if (cuisine_ids && cuisine_ids.length > 0) {
        payload['Cuisine.cuisine'] = {
            $in: cuisine_ids
        };
    }

    Restaurant.find(payload)
    .then(result => {
        res.status(200).json({
            message: "filtered list fecthed successfully",
            restaurants: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    })
}

exports.getRestaurantById = (req, res) => {
    Restaurant.find({ 
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            restaurant:  result[0],
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}