const express = require('express');
const CarsController = require('./app/controllers/CarsController');
const AnnoucementController = require('./app/controllers/AnnouncementController');

const routes = express.Router();

const carsController = new CarsController();
const announcementController = new AnnoucementController();

routes.get('/cars/toyota/models/', carsController.index);
routes.get('/cars/toyota/models/versions/ano', carsController.show);
routes.get('/cars/toyota', carsController.showCars);
routes.post('/cars/toyota/', carsController.create);
routes.put('/cars/toyota/:id', carsController.update);
routes.delete('/cars/toyota/:id', carsController.delete);

routes.get('/announcements', announcementController.index);

module.exports = routes;