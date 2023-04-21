import { MessageService } from 'primeng/api';
import { ErrorDTO } from '../models/ErrorDTO.model';

export function alertSuccess(api: MessageService, message: string = ''): void {
    api.add({
        severity: 'success',
        summary: 'Success',
        detail: message
    });
}

export function alertError(api: MessageService, error: ErrorDTO): void {
    api.add({
        severity: 'error',
        summary: 'Error',
        detail: <string>error.message
    });
}

export const UrlHelper = {

    logIn() {
        return '/login';
    },

    signUp() {
        return '/signup';
    },

    expense() {
        return '/pages/expense';
    },

    expenseAll() {
        return '/pages/expense/all';
    },

    newExpense() {
        return '/pages/expense/form';
    },

    editExpense(id?: string) {
        return '/pages/expense/form/' + id;
    },

    categoryManagement() {
        return '/pages/category';
    },

    newCategory() {
        return '/pages/category/form';
    },

    editCategory(id?: string) {
        return '/pages/category/form/' + id;
    }
    
}

export const TRANSACTION_TYPES = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
];