import { Request, Response } from "express";
import { AuthControllerGateway } from "./controllers/auth.controller";
import { feedbackControllerGateway } from "./controllers/feedback.controller";
import { TripControllerGateway } from "./controllers/trip.controller";
import { UserControllerGateway } from "./controllers/user.controller";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(loggerMiddleware);

const authController = new AuthControllerGateway();
const tripController = new TripControllerGateway();
const userController = new UserControllerGateway();
const feedbackController = new feedbackControllerGateway();

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

app.get('/api/gateway/feedbacks', feedbackController.getFeedbacks.bind(tripController));
app.get('/api/gateway/feedbacks/trip/:id', feedbackController.getFeedbackByTripId.bind(tripController));
app.get('/api/gateway/feedbacks/user/:id', feedbackController.getFeedbackByUserId.bind(tripController));
app.get('/api/gateway/feedbacks/:id', feedbackController.getFeedbackById.bind(tripController));
app.post('/api/gateway/feedbacks', feedbackController.createFeedback.bind(tripController));
app.put('/api/gateway/feedbacks/:id', feedbackController.updateFeedback.bind(tripController));
app.delete('/api/gateway/feedbacks/:id', feedbackController.deleteFeedback.bind(tripController));

app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        error: "This route does not exist."
    });
});


app.listen(Number(process.env.PORT), ()=> {
    console.log('API Gateway en écoute sur le port ' + process.env.PORT);
});
