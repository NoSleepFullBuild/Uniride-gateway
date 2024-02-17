import { AuthControllerGateway } from "./controllers/auth.controller";
import { TripControllerGateway } from "./controllers/trip.controller";
import { UserControllerGateway } from "./controllers/user.controller";


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const authController = new AuthControllerGateway();
const tripController = new TripControllerGateway();
const userController = new UserControllerGateway();

app.post('/api/gateway/auth/login', authController.login.bind(authController));
app.post('/api/gateway/auth/register', authController.register.bind(authController));
app.post('/api/gateway/auth/logout', authController.logout.bind(authController));
app.get('/api/gateway/auth/verify-token', authController.verifyToken.bind(authController));

app.get('/api/gateway/users/whoiam', userController.whoIam.bind(userController));
app.get('/api/gateway/users/:id', userController.getUserById.bind(userController));
app.get('/api/gateway/users', userController.getUsers.bind(userController));
app.put('/api/gateway/users/:id', userController.updateUser.bind(userController));
app.delete('/api/gateway/users/:id', userController.deleteUser.bind(userController));

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
