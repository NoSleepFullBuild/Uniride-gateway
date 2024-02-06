import axios from "axios";
import { Request, Response } from "express";
import { TRIP_API_URL } from "../const";
import { Token } from "../middleware/token";

export class TripControllerGateway {
  private tokenService: Token;

  constructor() {
    this.tokenService = new Token();
  }

  async getTrips(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.get(`${TRIP_API_URL}`);
      return res.status(200).json(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || error.message || "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async getTripById(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.get(`${TRIP_API_URL}/${req.params.id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async createTrip(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.post(`${TRIP_API_URL}`, req.body);
      return res.status(201).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async joinTrip(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.post(
        `${TRIP_API_URL}/${req.params.id}/join`,
        req.body
      );
      console.log(response);
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async getTripsByPassengerId(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.get(
        `${TRIP_API_URL}/passengers/${req.params.id}`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async updateTrip(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.put(
        `${TRIP_API_URL}/${req.params.id}`,
        req.body
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async deleteTrip(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.delete(`${TRIP_API_URL}/${req.params.id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async getPassengersByTripId(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.get(
        `${TRIP_API_URL}/${req.params.id}/passengers`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }

  async getTripsByDriverId(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.tokenService.verifyToken(token);
      console.log(tokenResponse);

      const response = await axios.get(
        `${TRIP_API_URL}/drivers/${req.params.id}`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(500)
        .json(error.response?.data || "Internal Server Error");
    }
  }
}
