import { AuthResponse } from "src/services/authenticate";

export interface Response {
    items: any;
    host: AuthResponse
}