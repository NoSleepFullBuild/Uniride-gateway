import axios from "axios";
import { Request, Response } from "express";
import { TRIP_API_URL, USER_API_URL } from "../const";
import { Authenticate } from "../services/authenticate";
import { UserControllerGateway } from "./user.controller";


export class TripControllerGateway {
  private authenticationService: Authenticate

  constructor() {
    this.authenticationService = new Authenticate();
  }

  async getTrips(req: Request, res: Response) {
    try {
      
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const trips = await axios.get(`${TRIP_API_URL}`);

      if (trips.data.error) {
        return res.status(404).json(trips.data);
      }

      const response = {
        items: [ trips.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);

    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async getTripById(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const getTipById = await axios.get(`${TRIP_API_URL}/${req.params.id}`);

      const response = {
        items: [ getTipById.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);

    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
  }
  }

  async createTrip(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const structuredData = {
        data: req.body,
        metadata: {
            ...authentication
        }
      };

      // Get id from user
      const user = await axios.get(`${USER_API_URL}/whoIam/${authentication.user.email}`, {
        headers: {
          Authorization: `Bearer ${authentication.token}`,
        },
      });

      structuredData.data.userId = user.data.id;
      const createTrip = await axios.post(`${TRIP_API_URL}`, structuredData)

      const response = {
        items: [ createTrip.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(201).json(response);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
  }
  }

  async joinTrip(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const joinTrip = await axios.post(
        `${TRIP_API_URL}/${req.params.id}/join`,
         { ...req.body},
      );

      
      const response = {
        items: [ joinTrip.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
  }
  }

  async getTripsByPassengerId(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const getTripsById = await axios.get(
        `${TRIP_API_URL}/passengers/${req.params.id}`
      );

            
      const response = {
        items: [ getTripsById.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async updateTrip(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const updateTrip = await axios.put(
        `${TRIP_API_URL}/${req.params.id}`,
        { ...req.body },
      );

      const response = {
        items: [ updateTrip.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async getUserByTripId(req: Request, res: Response) {

    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const user = await axios.get(`${TRIP_API_URL}/users/${req.params.tripId}`, {
        headers: {
          Authorization: `Bearer ${authentication.token}`,
        },
      });

      console.log("user", user)

      const response = {
        items: [ user.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async deleteTrip(req: Request, res: Response) {
    try {
      const authentication = await this.authenticationService.getAuth(req);
      if(authentication.error){
        return res.status(401).json(authentication);
      }

      const deleteTrip = await axios.delete(`${TRIP_API_URL}/${req.params.id}`);

      const response = {
        items: [ deleteTrip.data ],
        host: { ... authentication.user, token: authentication.token }
      };

      return res.status(200).json(response);
      
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async getPassengersByTripId(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.authenticationService.getAuth(req);
      console.log(tokenResponse);

      const response = await axios.get(
        `${TRIP_API_URL}/${req.params.id}/passengers`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }

  async getTripsByDriverId(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const tokenResponse = await this.authenticationService.getAuth(req);
      console.log(tokenResponse);

      const response = await axios.get(
        `${TRIP_API_URL}/drivers/${req.params.id}`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      if(error.response?.data.error){
          return res
          .status(500)
          .json(error.response?.data);
      }else{
          return res
          .status(500)
          .json({error: "Internal Server Error"});
      }
    }
  }
}
