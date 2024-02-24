import { Request, Response } from "express";
import axios from "axios";
import { AUTH_API_URL, USER_API_URL } from "../const";

export class AuthControllerGateway {
  async register(req: Request, res: Response) {

    // checkout fields
    const { email, username, password } = req.body;
    if (!email || !username || !password ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const authResponse = await axios.post(
        `${AUTH_API_URL}/register`,
        req.body
      );

      if (authResponse.status !== 201) {
        return res.status(authResponse.status).json(authResponse.data);
      }
      

      console.log("authResponse", authResponse.data);

      const userResponse = await axios.post(`${USER_API_URL}`, {...req.body, authId: authResponse.data.user.id});
      if (userResponse.status !== 200) {
        return res.status(userResponse.status).json(userResponse.data);
      }

      return res
        .status(200)
        .json({
          message: "Auth successfully registered",
          data: userResponse.data,
        });
        
    } catch (error) {
      console.log(error.response)
      return res
        .status(500)
        .json(error.response?.data.error || "Internal Server Error");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response = await axios.post(`${AUTH_API_URL}/login`, req.body);

      return res.status(200).json({
        message: "User successfully logged in",
        data: response.data,
      });
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

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) throw new Error("No token provided.");

      const response = await axios.post(
        `${AUTH_API_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.status(200).json({
        message: "User successfully logged out",
        data: response.data,
      });
      
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

  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const response = await axios.get(`${AUTH_API_URL}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.status(200).json({
        message: "Token is valid",
        data: response.data,
      });

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

  async whoIam(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ error: "No token provided." });
      }

      const response = await axios.get(`${AUTH_API_URL}/whoiam`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(error);
    }
  }
}
