import http from '@/core/_shared/api/HttpCommon';
import { AxiosResponse } from 'axios';
import { AuthenticatedUserResource } from '../resources/AuthenticatedUserResource';
import { UserResource } from '../resources/UserResource';
import { SaveUserResource } from '../resources/SaveUserResource';

export class UsersApi {
    private static baseUrl = "users";

    static async registerUser(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        return await http.post(`${this.baseUrl}/register`, data);
    }

    static async loginUser(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        console.log(`${this.baseUrl}/login`);
        return await http.post(`${this.baseUrl}/login`, data);
    }

    static async updateUserUsername(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        return await http.put(`${this.baseUrl}/update/username`, data);
    }

    static async updateUserPassword(data: SaveUserResource): Promise<AxiosResponse<UserResource, any>> {
        return await http.put(`${this.baseUrl}/update/password`, data);
    }
}