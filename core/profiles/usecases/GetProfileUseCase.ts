import { ProfilesApi } from "../api/ProfilesApi";
import { ProfileResource } from "../resources/ProfileResource";

export class GetProfileUseCase {
    async getProfile(): Promise<ProfileResource> {
        try {
            const response = await ProfilesApi.getProfile();
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}