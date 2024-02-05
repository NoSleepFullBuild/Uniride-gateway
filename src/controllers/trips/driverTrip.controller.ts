
import { TRIP_API_URL } from '../../const';
import { Request, Response } from 'express';
import axios from 'axios';

export class DriverTripController {

    async getDriverTrips(req: Request, res: Response) {

        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.get(`${TRIP_API_URL}/drivers`, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }

    async getDriverTripById(req: Request, res: Response) {
        const token = req.headers["authorization"]?.split(" ")[1];
        const { id } = req.params;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.get(`${TRIP_API_URL}/drivers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }

    async createDriverTrip(req: Request, res: Response) {
        const token = req.headers["authorization"]?.split(" ")[1];
        const tripData = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const response = await axios.post(`${TRIP_API_URL}/drivers`, tripData, { headers: { Authorization: `Bearer ${token}` } });
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json(error.response?.data || 'Internal Server Error');
        }
    }

}