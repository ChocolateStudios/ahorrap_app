import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";

export class LoginUserUsecase {
    async loginUser(saveUserResource: SaveUserResource) {
        console.log(saveUserResource);

        try {
            const response = await UsersApi.loginUser(saveUserResource);
            const resource = response.data;
            console.log(resource);
        } catch (error) {
            console.log(error);
        }
    }
}