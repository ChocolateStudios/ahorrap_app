export interface ExpenseResource {
    id: number;
    description: string;
    amount: number;
    dateTime: Date;
    profileId: number;
}