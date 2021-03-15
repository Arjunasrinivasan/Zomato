const express = require('express');
const cityController = require('../Controllers/City');
const mealTypeController = require('../Controllers/MealType');
const restaurantController = require('../Controllers/Restaurant');
const userController = require('../Controllers/User');
const menuController = require('../Controllers/Menu');
const orderController = require('../Controllers/Orders');
const paymentGatewayController = require('../Controllers/paymentGatewayController');

const router = express.Router();

router.get('/cityList', cityController.getCityList);
router.get('/getRestaurantsByCity/:city', cityController.getRestaurantsByCity);
router.get('/mealtype', mealTypeController.getMealType);
router.post('/restaurantFilter', restaurantController.filter);
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/getRestaurantById/:id', restaurantController.getRestaurantById);
router.get('/getMenuForRestaurant/:id', menuController.getMenuForRestaurant);
router.get('/getOrdersForUser/:username', orderController.getOrdersForUser);
router.post('/saveOrderForUser', orderController.saveOrdersForUser);
router.post('/payment', paymentGatewayController.payment);
router.post('/callback', paymentGatewayController.callback);

module.exports = router;