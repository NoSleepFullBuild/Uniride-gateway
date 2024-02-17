import axios from "axios";
import { Request, Response } from "express";
import { AUTH_API_URL, USER_API_URL } from "../const";

export class UserControllerGateway{

    async whoIam(req:Request, res: Response){
        try {
            const token = req.headers["authorization"]?.split(" ")[1];

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

            const responseUser = await axios.get(`${USER_API_URL}/whoIam`, {
                params: {
                    authId: responseAuth.data.id,
                },
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
}