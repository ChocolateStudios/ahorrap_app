import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";
import { UserResource } from "../resources/UserResource";

export class UpdateUserPasswordUseCase {
    async updateUserPassword(saveUserResource: SaveUserResource): Promise<UserResource> {
        try {
            const response = await UsersApi.updateUserPassword(saveUserResource);
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}