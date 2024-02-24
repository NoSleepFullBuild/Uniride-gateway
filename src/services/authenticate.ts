import { Request } from 'express'; // Assurez-vous d'importer ce type
import axios from "axios";
import { AUTH_API_URL } from "../const";

interface AuthMetadata {
  email: string;
  username: string;
  role: string
}

export interface AuthResponse {
  message?: string;
  user?: AuthMetadata;
  error?: string; 
  token?: string;
}

export class Authenticate {

  public async getAuth(req: Request): Promise<AuthResponse> {
    try {

      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return { error: "No token provided." };
      }
      const response = await axios.get(`${AUTH_API_URL}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response)

      return this.structureData(response.data, token);
    } catch (error) {
      return { error: error.response?.data.error || "Internal Server Error" };
    }
  }

  public async structureData(authMetadata: AuthMetadata, token: string, message?: string): Promise<AuthResponse> {
    return {
      message,
      user: authMetadata,
      token
    };
  }
}
