import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ExpenseDTO } from "../models/ExpenseDTO.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PageOfExpenseDTO } from "../models/PageOfExpenseDTO.model";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private basePath: string = `${environment.api}/expense`;
    constructor(
        private httpClient: HttpClient
    ) { }

    saveExpenseUsingPOST(expense: ExpenseDTO): Observable<any> {
        const url: string = this.basePath;
        return this.httpClient
            .post(url, expense);
    }

    getExpensesUsingGET(page: number, pageSize: number): Observable<PageOfExpenseDTO> {
        const url: string = `${this.basePath}?page=${page}&pageSize=${pageSize}`;

        return this.httpClient
            .get<PageOfExpenseDTO>(url);
    }

    getExpenseByIdUsingGET(id: string): Observable<ExpenseDTO> {
        const url: string = `${this.basePath}/${id}`;
        
        return this.httpClient
            .get<ExpenseDTO>(url);
    } 
}