import { GetUserUseCase } from "../usecases/GetUserUseCase";

export const useAuth = async () => {
    const getUserUseCase = new GetUserUseCase();
    const result = await getUserUseCase.getUser();

    if (result.success) {
      return { authenticated: true };
    }
    
    return { authenticated: false };
};