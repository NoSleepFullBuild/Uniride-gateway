import axios from "axios";
import { AUTH_API_URL, USER_API_URL } from "../const";
import { Authenticate } from "../services/authenticate";
import { Request, Response, NextFunction } from "express";

export class UserControllerGateway{

    private authenticationService : Authenticate
    
    constructor(){
        this.authenticationService = new Authenticate();
    }

    async whoIam(req: Request, res: Response): Promise<Response>{
        try {
          const authentication = await this.authenticationService.getAuth(req);
          if(authentication.error){
            return res.status(401).json(authentication);
          }

          const responseUser = await axios.get(`${USER_API_URL}/whoIam/${authentication.user.email}`, {
            headers: {
              Authorization: `Bearer ${authentication.token}`,
            },
          });
      
          if (responseUser.data.error) {
            return res.status(404).json(responseUser.data);
          }
      
          const reponse = {
            items: [ responseUser.data ],
            host: { ... authentication.user, token: authentication.token }
          };
      
          return res.status(200).json(reponse);
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

    async getUsers(req: Request, res: Response): Promise<Response>{
        try {

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            if(authentication.user.role !== "admin"){
                return res.status(403).json({ error: "You are not authorized to access this resource" });
            }
            
            const users = await axios.get(`${USER_API_URL}/`, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                },
            });

            const reponse = {
                items: [users.data ],
                host: { ... authentication.user, token: authentication.token }
              };

            return res.status(200).json(reponse);

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

    async getUserById(req: Request, res: Response) {
        try {
            
            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }
           
            if(authentication.user.role !== "admin"){
                return res.status(403).json({ error: "You are not authorized to access this resource" });
            }

            const userById = await axios.get(`${USER_API_URL}/${req.params.id}`, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                },
            });

            const reponse = {
                message: "User successfully found",
                items: [userById.data],
                host: { ... authentication.user, token: authentication.token }
              };

            return res.status(200).json(reponse);

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

    async updateUser(req: Request, res: Response) {
        try {
            
            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const updateUserById = await axios.put(
                `${USER_API_URL}/${req.params.id}`,
                req.body,
                {
                    headers: {
                        Authorization: `Bearer ${authentication.token}`,
                    },
                }
            );

            const reponse = {
                message: "User successfully updated",
                items: [ updateUserById.data ],
                host: { ... authentication.user, token: authentication.token }
              };

            return res.status(200).json(reponse);

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

    async deleteUser(req: Request, res: Response) {
        try {
            
            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            if(authentication.user.role !== "admin"){
                return res.status(403).json({ error: "You are not authorized to access this resource" });
            }

            const deleteUser = await axios.delete(`${USER_API_URL}/${req.params.id}`, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                },
            });

            const reponse = {
                message: "User successfully deleted",
                items: [ deleteUser.data ],
                host: { ... authentication.user, token: authentication.token }
              };

            return res.status(200).json(reponse);

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
