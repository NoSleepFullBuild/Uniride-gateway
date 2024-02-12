import axios from "axios";
import { Request, Response } from "express";
import { USER_API_URL } from "../const";
import { Token } from "../middleware/token";

export class UserControllerGateway {
  private tokenService: Token;

  constructor() {
    this.tokenService = new Token();
  }

  async getUserById(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.getAuth(token);
      console.log(tokenResponse);

      const response = await axios.get(`${USER_API_URL}/${req.params.id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }
}
