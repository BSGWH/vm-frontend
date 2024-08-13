import { boolean, string } from "zod";

export interface Service{
    service_id: number;
    vehicle: string;
    service_type: string;
    provider:string;
    service_date: string;
    service_time:string;
    status:string;
}