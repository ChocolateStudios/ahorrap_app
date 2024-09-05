import { UserResource } from "../resources/UserResource";

export class AuthenticationUserResponse {
    authenticatedUser?: UserResource | null = null;
    success: boolean = false;
    usernameErrorMessage: string = '';
    passwordErrorMessage: string = '';
    alertErrorMessage: string = '';

    constructor(options?: Partial<AuthenticationUserResponse>) {
        Object.assign(this, options);
    }
}