import http from '@/core/_shared/api/HttpCommon';
import { AxiosResponse } from 'axios';
import { ProfileResource } from '../resources/ProfileResource';
import { SaveProfileResource } from '../resources/SaveProfileResource';

export class ProfilesApi {
    private static baseUrl = "profiles";

    static async createProfile(data: SaveProfileResource): Promise<AxiosResponse<ProfileResource, any>> {
        return await http.post(`${this.baseUrl}`, data);
    }

    static async updateProfile(data: SaveProfileResource): Promise<AxiosResponse<ProfileResource, any>> {
        return await http.put(`${this.baseUrl}`, data);
    }

    static async deleteProfile(): Promise<AxiosResponse<ProfileResource, any>> {
        return await http.delete(`${this.baseUrl}`);
    }

    static async getProfile(): Promise<AxiosResponse<ProfileResource, any>> {
        return await http.get(`${this.baseUrl}`);
    }
}