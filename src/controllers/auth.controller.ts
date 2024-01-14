import { Request, Response } from 'express';
import axios from 'axios';
import { AUTH_API_URL, USER_API_URL } from '../const';

export class AuthControllerGateway{

    async register(req: Request, res: Response) {
        const { firstname, lastname, role, email, username, password } = req.body;

        if (role !== 'user' && role !== 'driver') {
            return res.status(400).json({ error: 'Role must be user or driver' });
        }

        if (!firstname || !lastname || !role || !email || !username || !password) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        try {
            const authResponse = await axios.post(`${AUTH_API_URL}/register`, { email, username, password });

            if (authResponse.status !== 200) {
                return res.status(authResponse.status).json({ error: authResponse.data });
            }

            const userResponse = await axios.post(`${USER_API_URL}/users`, { firstname, lastname, username, email, role });

            if (userResponse.status !== 200) {
                return res.status(userResponse.status).json({ error: userResponse.data });
            }

            return res.status(200).json({ message: 'User successfully registered', data: userResponse.data });

        } catch (error) {
            return res.status(500).json({ error: error.response?.data || 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });

            return res.status(200).json(response.data);

        } catch (error) {
            return res.status(500).json({ error: error.response?.data || 'Internal Server Error' });
        }
    }

}