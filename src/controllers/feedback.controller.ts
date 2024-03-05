import axios from "axios";
import { FEEDBACK_API_URL } from "../const";
import { Request, Response } from "express";

export class feedbackControllerGateway {

    async getFeedbacks(req: Request, res: Response) {
        try{
            const response = await axios.get(`${FEEDBACK_API_URL}`);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async getFeedbackById(req: Request, res: Response) {
        try{
            const response = await axios.get(`${FEEDBACK_API_URL}/feedbacks/${req.params.id}`);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async getFeedbackByTripId(req: Request, res: Response) {
        try{
            const response = await axios.get(`${FEEDBACK_API_URL}/feedbacks/trip/${req.params.tripId}`);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async getFeedbackByUserId(req: Request, res: Response) {
        try{
            const response = await axios.get(`${FEEDBACK_API_URL}/feedbacks/user/${req.params.userId}`);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async createFeedback(req: Request, res: Response) {
        try{
            const response = await axios.post(`${FEEDBACK_API_URL}/feedbacks`, req.body);
            return res.status(201).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async updateFeedback(req: Request, res: Response) {
        try{
            const response = await axios.put(`${FEEDBACK_API_URL}/feedbacks/${req.params.id}`, req.body);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

    async deleteFeedback(req: Request, res: Response) {
        try{
            const response = await axios.delete(`${FEEDBACK_API_URL}/feedbacks/${req.params.id}`);
            return res.status(200).json(response.data);
        }catch(error){
            return res.status(500).json(error.response?.data.error || "Internal Server Error");
        }
    }

}