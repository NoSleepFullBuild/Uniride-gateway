import { AuthControllerGateway } from "./controllers/auth.controller";
import { DriverTripController } from "./controllers/trips/driverTrip.controller";

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const authController = new AuthControllerGateway();
const driverTripController = new DriverTripController();

app.post('/api/gateway/login', authController.login.bind(authController));
app.post('/api/gateway/register', authController.register.bind(authController));
app.post('/api/gateway/logout', authController.logout.bind(authController));

app.get('/api/gateway/trips/drivers', driverTripController.getDriverTrips.bind(driverTripController));


app.listen(3002, () => {
    console.log('API Gateway en écoute sur le port 3002');
});
