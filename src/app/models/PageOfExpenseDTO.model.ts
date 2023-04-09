import { ExpenseDTO } from "./ExpenseDTO.model";

export interface PageOfExpenseDTO {
    data: ExpenseDTO[];
    page: number;
    pageSize: number;
    total: number;
}