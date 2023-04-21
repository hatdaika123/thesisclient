import { ExpenseDTO } from "./ExpenseDTO.model";

export interface PageOfExpenseDTO {
    data: ExpenseDTO[];
    currentPage: number;
    pageSize: number;
    total: number;
}