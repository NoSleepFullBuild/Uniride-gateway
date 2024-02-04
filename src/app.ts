import { AuthControllerGateway } from "./controllers/auth.controller";

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const authController = new AuthControllerGateway();

app.post('/api/gateway/login', authController.login.bind(authController));
app.post('/api/gateway/register', authController.register.bind(authController));
app.post('/api/gateway/logout', authController.logout.bind(authController));

app.listen(3002, () => {
    console.log('API Gateway en écoute sur le port 3002');
});
