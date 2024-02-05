
import { TRIP_API_URL } from '../../const';
import { Request, Response } from 'express';
import axios from 'axios';

export class userTripController {

    async getUserTrips(req: Request, res: Response) {

        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.get(`${TRIP_API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }

    async getUserTripById(req: Request, res: Response) {
        const token = req.headers["authorization"]?.split(" ")[1];
        const { id } = req.params;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.get(`${TRIP_API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }

    async createUserTrip(req: Request, res: Response) {
        const token = req.headers["authorization"]?.split(" ")[1];
        const tripData = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.post(`${TRIP_API_URL}/users`, tripData, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }
    
}