const Orders = require('../Models/Orders');

exports.getOrdersForUser = (req, res) => {
    Orders.find({ 
        username: req.params.username
    }).then(result => {
        res.status(200).json({
            orders:  result,
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}

exports.saveOrdersForUser = (req, res) => {
    // see the user creation controller method
}