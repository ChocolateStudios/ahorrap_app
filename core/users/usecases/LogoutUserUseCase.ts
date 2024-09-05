import { SimpleResponse } from "@/core/_shared/responses/SimpleResponse";

export class LogoutUserUseCase {
    logoutUser(): SimpleResponse {
        try {
            localStorage.removeItem('token');

            return new SimpleResponse({
                success: true,
            });
        } catch (error) {
            console.log(error);
            return new SimpleResponse({
                alertErrorMessage: 'Something was wrong',
            });
        }
    }
}