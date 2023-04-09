import { CategoryDTO } from "./CategoryDTO.model";

export interface ExpenseDTO {
    _id?: string;
    type?: 'expense' | 'income';
    categoryId?: string;
    category?: CategoryDTO;
    location?: string;
    description?: string;
    amount?: number;
    date?: Date;
    images?: string[];
}