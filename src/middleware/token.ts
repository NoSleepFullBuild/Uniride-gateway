import axios from "axios";
import { AUTH_API_URL } from "../const";

export class Token {

    public async verifyToken(token: string){
        if (!token) {
            throw new Error("No token provided.");
        }
        const response = await axios.get(`${AUTH_API_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status !== 200) {
            throw new Error('Token is not valid.');
        }

        return response.data;
    }
}
