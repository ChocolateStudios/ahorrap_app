import { ProfilesApi } from "@/core/profiles/api/ProfilesApi";
import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";
import { AuthenticationUserResponse } from "../responses/AuthenticationUserResponse";

export class RegisterUserUseCase {
    async registerUser(saveUserResource: SaveUserResource): Promise<AuthenticationUserResponse> {
        try {
            const response = await UsersApi.registerUser(saveUserResource);
            const resource = response.data;
            console.log('Usuario registrado:', resource);

            if (!resource || !resource.token) {
                return new AuthenticationUserResponse({
                    alertErrorMessage: 'Something was wrong',
                });
            }

            localStorage.setItem('token', resource.token);

            if (resource.id) {
                const response2 = await ProfilesApi.createProfile({
                    firstName: 'FirstName',
                    lastName: 'LastName',
                    email: resource.username,
                });
                const resource2 = response2.data;
                console.log('Perfil creado: ', resource2);
            }

            return new AuthenticationUserResponse({
                authenticatedUser: resource,
                success: true,
            });
        } catch (error: any) {
            console.log(error);

            const errorMessage: string = error.response.data.message;
            let _alertErrorMessage = 'TODO: identificar posibles errores';

            if (errorMessage.includes('User already exists with username')) {
                _alertErrorMessage = 'Ya existe un usuario registrado con este correo';
            }

            return new AuthenticationUserResponse({
                alertErrorMessage: _alertErrorMessage,
            });
        }
    }
}