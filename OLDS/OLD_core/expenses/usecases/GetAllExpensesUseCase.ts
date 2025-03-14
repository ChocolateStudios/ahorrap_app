import { ExpensesApi } from "../api/ExpensesApi";
import { ExpensesResponse } from "../responses/ExpensesResponse";

export class GetAllExpensesUseCase {
    async getAllExpenses(): Promise<ExpensesResponse> {
        try {
            const response = await ExpensesApi.getAllExpenses();
            const resource = response.data;
            console.log('Usuario logueado:', resource);
            return new ExpensesResponse({
                expenses: resource,
                success: true,
            });
        } catch (error) {
            console.log(error);
            return new ExpensesResponse({
                alertErrorMessage: 'Something was wrong',
            });
        }
    }
}