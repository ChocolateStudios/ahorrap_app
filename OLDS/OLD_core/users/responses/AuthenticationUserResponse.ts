import { AuthenticatedUserResource } from "../resources/AuthenticatedUserResource";

export class AuthenticationUserResponse {
    authenticatedUser?: AuthenticatedUserResource | null = null;
    success: boolean = false;
    usernameErrorMessage: string = '';
    passwordErrorMessage: string = '';
    alertErrorMessage: string = '';

    constructor(options?: Partial<AuthenticationUserResponse>) {
        Object.assign(this, options);
    }
}