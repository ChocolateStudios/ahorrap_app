import http from '@/core/_shared/api/HttpCommon';
import { AxiosResponse } from 'axios';
import { SaveExpenseResource } from "../resources/SaveExpenseResource";
import { ExpenseResource } from '../resources/ExpenseResource';

export class ExpensesApi {
    private static baseUrl = "expenses";

    static async createExpense(data: SaveExpenseResource): Promise<AxiosResponse<ExpenseResource, any>> {
        return await http.post(`${this.baseUrl}`, data);
    }

    static async updateExpense(id: number, data: SaveExpenseResource): Promise<AxiosResponse<ExpenseResource, any>> {
        return await http.put(`${this.baseUrl}/${id}`, data);
    }

    static async deleteExpense(id: number): Promise<AxiosResponse<ExpenseResource, any>> {
        return await http.delete(`${this.baseUrl}/${id}`);
    }

    static async getAllExpenses(): Promise<AxiosResponse<ExpenseResource[], any>> {
        return await http.get(`${this.baseUrl}`);
    }
}