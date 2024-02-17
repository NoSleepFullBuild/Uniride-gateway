import axios from "axios";
import { Request, Response } from "express";
import { AUTH_API_URL, USER_API_URL } from "../const";

export class UserControllerGateway{

    async whoIam(req:Request, res: Response){
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            console.log(token)

            if (!token) {
                return res.status(400).json({ error: "No token provided." });
            }

            const responseAuth = await axios.get(`${AUTH_API_URL}/whoIam`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
            if(responseAuth.data.error){
                return res.status(401).json(responseAuth.data);
            }

            const responseUser = await axios.get(`${USER_API_URL}/whoIam/${responseAuth.data.authId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(responseUser.data.error){
                return res.status(404).json(responseUser.data);
            }

            return res.status(200).json(responseUser.data);

        } catch (error) {
            return res
                .status(500)
                .json(error.response?.data || "Internal Server Error");
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ error: "No token provided." });
            }

            const response = await axios.get(`${USER_API_URL}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(200).json(response.data);
        } catch (error) {
            return res
                .status(500)
                .json(error.response?.data || "Internal Server Error");
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ error: "No token provided." });
            }

            const response = await axios.get(`${USER_API_URL}/${req.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(200).json(response.data);
        } catch (error) {
            return res
                .status(500)
                .json(error.response?.data || "Internal Server Error");
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ error: "No token provided." });
            }

            const response = await axios.put(
                `${USER_API_URL}/update/${req.params.id}`,
                req.body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.status(200).json(response.data);
        } catch (error) {
            return res
                .status(500)
                .json(error.response?.data || "Internal Server Error");
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ error: "No token provided." });
            }

            const response = await axios.delete(`${USER_API_URL}/delete/${req.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(200).json(response.data);
        } catch (error) {
            return res
                .status(500)
                .json(error.response?.data || "Internal Server Error");
        }
    }

}
