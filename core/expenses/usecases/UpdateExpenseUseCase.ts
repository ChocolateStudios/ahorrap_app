import { ExpensesApi } from "../api/ExpensesApi";
import { SaveExpenseResource } from "../resources/SaveExpenseResource";
import { ExpenseResponse } from "../responses/ExpenseResponse";

export class UpdateExpenseUseCase {
    async updateExpense(expenseId: number, saveExpenseResource: SaveExpenseResource): Promise<ExpenseResponse> {
        try {
            const response = await ExpensesApi.updateExpense(expenseId, saveExpenseResource);
            const resource = response.data;
            console.log('Expense updated:', resource);
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