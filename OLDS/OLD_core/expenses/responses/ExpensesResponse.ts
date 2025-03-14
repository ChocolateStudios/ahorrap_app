import { ExpenseResource } from "../resources/ExpenseResource";

export class ExpensesResponse {
    expenses: ExpenseResource[] = [];
    success: boolean = false;
    alertErrorMessage: string = '';

    constructor(options?: Partial<ExpensesResponse>) {
        Object.assign(this, options);
    }
}