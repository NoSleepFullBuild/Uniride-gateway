import axios from "axios";
import { AUTH_API_URL } from "../const";

interface AuthMetadata {
    id: number;
    email: string;
    username: string;
}

interface AuthResponse {
    message?: string;
    user: AuthMetadata;

}

export class Token {

    public async getAuth(token: string): Promise<AuthResponse>{

        if (!token) {
            throw new Error("No token provided.");
        }
        const response = await axios.get(`${AUTH_API_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status !== 200) {
            throw new Error('Token is not valid.');
        }

        return this.structureData("Authentification successfull", response.data);
    }

    public async structureData(message: string, AuthMetadata: AuthMetadata): Promise<AuthResponse> {
        return { 
            message: message,
            user: AuthMetadata
         };
    }
}
