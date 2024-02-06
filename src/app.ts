import { AuthControllerGateway } from "./controllers/auth.controller";
import { TripControllerGateway } from "./controllers/trip.controller";


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const authController = new AuthControllerGateway();
const tripController = new TripControllerGateway();

app.post('/api/gateway/login', authController.login.bind(authController));
app.post('/api/gateway/register', authController.register.bind(authController));
app.post('/api/gateway/logout', authController.logout.bind(authController));
app.get('/api/gateway/whoiam', authController.whoIam.bind(authController));
app.get('/api/gateway/verify-token', authController.verifyToken.bind(authController));

app.get('/api/gateway/trips', tripController.getTrips.bind(tripController));
app.get('/api/gateway/trips/:id', tripController.getTripById.bind(tripController));

app.post('/api/gateway/trips', tripController.createTrip.bind(tripController));
app.post('/api/gateway/trips/:id/join', tripController.joinTrip.bind(tripController));

app.get('/api/gateway/trips/driver/:id', tripController.getTripsByDriverId.bind(tripController));
app.get('/api/gateway/trips/passengers/:id', tripController.getTripsByPassengerId.bind(tripController));
app.put('/api/gateway/trips/:id', tripController.updateTrip.bind(tripController));
app.delete('/api/gateway/trips/:id', tripController.deleteTrip.bind(tripController));






app.listen(3002, () => {
    console.log('API Gateway en écoute sur le port 3002');
});
