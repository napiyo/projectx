
import AppConfig from '@/config/config';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
// import Router from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../dataContext';

class BaseService {
    protected axiosInstance: AxiosInstance;
    protected token: string | null = null;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: `${AppConfig.BACKEND_BASE}/${baseURL}`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Include credentials with each request
        });

        // this.axiosInstance.interceptors.request.use(
        //     (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        //         if (this.token) {
        //             config.headers['Authorization'] = `Bearer ${this.token}`;
        //         }
        //         return config;
        //     },
        //     (error: any): Promise<any> => {
        //         return Promise.reject(error);
        //     }
        // );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {

                if (error.response && error.response.status === 401) {
                    this.logout();
                   
                    // useContext(UserContext).dispatch({ type: 'LOGOUT' });
                    // window.location.href = `/signup`;
                }
                return Promise.reject(error);
            }
        );

        this.token = Cookies.get('token') || null;
    }

    public logout(): void {
        this.token = null;
        Cookies.remove('token');
        // window.location.href = `/signup`;
    }

    private async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
        try {
            const response = await request;
            return response.data;
        } catch (error) {
            let message = 'An unexpected error occurred';
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.data) {
                        return error.response.data;
                    }
                    message = error.response.data?.message || 'Response error';
                } else if (error.request) {
                    message = 'No response received from server';
                } else {
                    message = error.message;
                }
            } else {
                message = (error as Error).message;
            }
            return {
                success: false,
                message,
            } as unknown as T;
        }
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.handleRequest(this.axiosInstance.get<T>(url, config));
    }

    protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        return this.handleRequest(this.axiosInstance.post<T>(url, data, config));
    }

    protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        return this.handleRequest(this.axiosInstance.put<T>(url, data, config));
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.handleRequest(this.axiosInstance.delete<T>(url, config));
    }
}

export default BaseService;
