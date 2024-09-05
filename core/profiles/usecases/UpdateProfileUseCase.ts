import { ProfilesApi } from "../api/ProfilesApi";
import { ProfileResource } from "../resources/ProfileResource";
import { SaveProfileResource } from "../resources/SaveProfileResource";

export class UpdateProfileUseCase {
    async updateProfile(saveProfileResource: SaveProfileResource): Promise<ProfileResource> {
        try {
            const response = await ProfilesApi.updateProfile(saveProfileResource);
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}