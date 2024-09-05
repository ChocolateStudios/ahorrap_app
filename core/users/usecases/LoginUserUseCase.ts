import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";
import { AuthenticationUserResponse } from "../responses/AuthenticationUserResponse";

export class LoginUserUseCase {
    async loginUser(saveUserResource: SaveUserResource): Promise<AuthenticationUserResponse> {
        try {
            const response = await UsersApi.loginUser(saveUserResource);
            const resource = response.data;

            if (!resource || !resource.token) {
                return new AuthenticationUserResponse({
                    alertErrorMessage: 'Something was wrong',
                });
            }

            localStorage.setItem('token', resource.token);

            console.log('Usuario logueado:', resource);
            return new AuthenticationUserResponse({
                authenticatedUser: resource,
                success: true,
            });
        } catch (error) {
            console.log(error);
            return new AuthenticationUserResponse({
                alertErrorMessage: 'Invalid credentials',
            });
        }
    }
}