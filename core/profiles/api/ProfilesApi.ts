import http from '@/core/_shared/api/HttpCommon';
import { AxiosResponse } from 'axios';

class ProfilesApi {
    private baseUrl = "profiles";

    async createProfile(data: any): Promise<AxiosResponse<any, any>> {
        return await http.post(`${this.baseUrl}`, data);
    }

    async updateProfile(data: any): Promise<AxiosResponse<any, any>> {
        return await http.put(`${this.baseUrl}`, data);
    }

    async getProfile(data: any): Promise<AxiosResponse<any, any>> {
        return await http.get(`${this.baseUrl}`, data);
    }
}