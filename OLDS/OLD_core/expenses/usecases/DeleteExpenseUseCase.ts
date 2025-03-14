import { ExpensesApi } from "../api/ExpensesApi";
import { ExpenseResponse } from "../responses/ExpenseResponse";

export class DeleteExpenseUseCase {
    async deleteExpense(expenseId: number): Promise<ExpenseResponse> {
        try {
            const response = await ExpensesApi.deleteExpense(expenseId);
            const resource = response.data;
            console.log('Expense deleted:', resource);
            return new ExpenseResponse({
                expense: resource,
                success: true,
            });
        } catch (error) {
            console.log(error);
            return new ExpenseResponse({
                alertErrorMessage: 'Something was wrong',
            });
        }
    }
}