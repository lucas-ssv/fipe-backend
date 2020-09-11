const express = require('express');
const CarsController = require('./controllers/index');

const routes = express.Router();

const carsController = new CarsController();

routes.get('/cars/toyota/models/', carsController.index);
routes.get('/cars/toyota/models/versions/ano', carsController.show);
routes.get('/cars/toyota', carsController.showCars);
routes.post('/cars/toyota/', carsController.create);
routes.put('/cars/toyota/:id', carsController.update);
routes.delete('/cars/toyota/:id', carsController.delete);

module.exports = routes;