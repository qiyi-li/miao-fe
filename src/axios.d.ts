import { AxiosRequestConfig } from "axios";
declare module 'axios' {
    export interface AxiosRequestConfig{
        _loading?: boolean,
        _mock?: string,
    }
}