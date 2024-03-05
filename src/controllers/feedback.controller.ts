import axios from "axios";
import { FEEDBACK_API_URL, TRIP_API_URL, USER_API_URL } from "../const";
import { Request, Response } from "express";
import { Authenticate } from "../../src/services/authenticate";

export class feedbackControllerGateway {

    private authenticationService : Authenticate
    
    constructor(){
        this.authenticationService = new Authenticate();
    }

    async getFeedbacks(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const get = await axios.get(`${FEEDBACK_API_URL}`);

            const response = {
                items: [ get.data ],
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

    async getFeedbackById(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const get = await axios.get(`${FEEDBACK_API_URL}/${req.params.id}`);

            const response = {
                items: [ get.data ],
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

    async getFeedbackByTripId(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const get = await axios.get(`${FEEDBACK_API_URL}/trip/${req.params.id}`);

            const response = {
                items: [ get.data ],
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

    async getFeedbackByUserId(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }
            const get = await axios.get(`${FEEDBACK_API_URL}/user/${req.params.id}`);

            const response = {
                items: [ get.data ],
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

    async createFeedback(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const responseUser = await axios.get(`${USER_API_URL}/whoIam/${authentication.user.email}`, {
                headers: {
                  Authorization: `Bearer ${authentication.token}`,
                },
            });

            if(req.body.tripId === undefined){
                return res.status(400).json({ error: "Trip id is required" });
            }

            // If trip exist

            const getTripById = await axios.get(`${TRIP_API_URL}/${req.body.tripId}`, {
                headers: {
                  Authorization: `Bearer ${authentication.token}`,
                },
            })

            if(getTripById.data.error){
                return res.status(400).json({ error: "Trip not found" });
            }

            const getUserById = await axios.get(`${TRIP_API_URL}/users/${req.body.tripId}`, {
                headers: {
                  Authorization: `Bearer ${authentication.token}`,
                },
            })

            console.log("getUserById", getUserById.data)

            console.log("responseUser", responseUser.data.id)
            const bodyPo = {
                ...req.body,
                userId:  responseUser.data.id,
                date: new Date(),
                driverId: getUserById.data,
                createdBy : authentication.user.email,
                updatedBy : authentication.user.email
            }

            const post = await axios.post(`${FEEDBACK_API_URL}`, bodyPo);
            
            const response = {
                items: [ post.data ],
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

    async updateFeedback(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const update = await axios.put(`${FEEDBACK_API_URL}/feedbacks/${req.params.id}`, req.body);

            const response = {
                items: [ update.data ],
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

    async deleteFeedback(req: Request, res: Response) {
        try{

            const authentication = await this.authenticationService.getAuth(req);
            if(authentication.error){
              return res.status(401).json(authentication);
            }

            const update = await axios.delete(`${FEEDBACK_API_URL}/feedbacks/${req.params.id}`);

            const response = {
                items: [ update.data ],
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

}