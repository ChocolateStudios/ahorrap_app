import { ProfilesApi } from "../api/ProfilesApi";
import { ProfileResource } from "../resources/ProfileResource";

export class DeleteProfileUseCase {
    async deleteProfile(): Promise<ProfileResource> {
        try {
            const response = await ProfilesApi.deleteProfile();
            const resource = response.data;
            console.log(resource);
            return resource;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}