import { ExpenseResource } from "../resources/ExpenseResource";

export class ExpenseResponse {
    expense?: ExpenseResource | null = null;
    success: boolean = false;
    descriptionErrorMessage: string = '';
    amountErrorMessage: string = '';
    dateTimeErrorMessage: string = '';
    alertErrorMessage: string = '';

    constructor(options?: Partial<ExpenseResponse>) {
        Object.assign(this, options);
    }
}