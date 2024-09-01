import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";

class RegisterUserUsecase {
    async registerUser(saveUserResource: SaveUserResource) {
        console.log(saveUserResource);
        await UsersApi.registerUser(saveUserResource);
    }
}