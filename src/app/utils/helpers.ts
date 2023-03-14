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

    signUp() {
        return '/signup';
    },

    expense() {
        return '/pages/expense';
    },

    newExpense() {
        return '/pages/expense/form';
    },

    categoryManagement() {
        return '/pages/category';
    },

    newCategory() {
        return '/pages/category/form';
    }
    
}