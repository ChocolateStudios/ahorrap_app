import { UsersApi } from "../api/UsersApi";
import { AuthenticatedUserResource } from "../resources/AuthenticatedUserResource";
import { SaveUserResource } from "../resources/SaveUserResource";

export class UpdateUserUsernameUseCase {
    async updateUserUsername(saveUserResource: SaveUserResource): Promise<AuthenticatedUserResource> {
        try {
            const response = await UsersApi.updateUserUsername(saveUserResource);
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}