import { ProfilesApi } from "../api/ProfilesApi";
import { ProfileResource } from "../resources/ProfileResource";
import { SaveProfileResource } from "../resources/SaveProfileResource";

export class CreateProfileUseCase {
    async createProfile(saveProfileResource: SaveProfileResource): Promise<ProfileResource> {
        try {
            const response = await ProfilesApi.createProfile(saveProfileResource);
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}