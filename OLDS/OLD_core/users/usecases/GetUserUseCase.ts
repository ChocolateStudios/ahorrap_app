import { UsersApi } from "../api/UsersApi";
import { UserResponse } from "../responses/UserResponse";

export class GetUserUseCase {
    async getUser(): Promise<UserResponse> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return new UserResponse({
                    alertErrorMessage: 'User was logged out',
                });
            }
            const response = await UsersApi.getUser();
            const resource = response.data;

            if (!resource || !resource.username) {
                return new UserResponse({
                    alertErrorMessage: 'Something was wrong',
                });
            }
            
            return new UserResponse({
                user: resource,
                success: true,
            });
        } catch (error) {
            console.log(error);
            return new UserResponse({
                alertErrorMessage: 'Something was wrong',
            });
        }
    }
}