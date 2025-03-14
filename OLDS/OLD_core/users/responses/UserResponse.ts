import { UserResource } from "../resources/UserResource";

export class UserResponse {
    user?: UserResource | null = null;
    success: boolean = false;
    alertErrorMessage: string = '';

    constructor(options?: Partial<UserResponse>) {
        Object.assign(this, options);
    }
}