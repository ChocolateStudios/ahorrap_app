import { UsersApi } from "../api/UsersApi";
import { SaveUserResource } from "../resources/SaveUserResource";

class UpdateUserUsecase {
    async updateUser(saveUserResource: SaveUserResource) {
        console.log(saveUserResource);
        await UsersApi.updateUser(saveUserResource);
    }
}