import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, concatMap, map, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { PieChartDataDTO } from "../models/PieChartDataDTO.model";
import { ExpenseDTO } from "../models/ExpenseDTO.model";
import { CategoryService } from "./category.service";
import { CategoryDTO } from "../models/CategoryDTO.model";
import { LineChartDataDTO } from "../models/LineChartDataDTO.model";

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    private basePath: string = `${environment.api}/statistic`;

    constructor(
        private httpClient: HttpClient,
        private categoryService: CategoryService
    ) { }

    getOverviewSummaryUsingGET(): Observable<{ income: number, expense: number }> {
        const url: string = this.basePath + '/summary';
        return this.httpClient
            .get<{ income: number, expense: number }>(url);
    }

    getPieChartDataUsingGET(type: "expense" | "income", date: "date" | "week" | "month" | "year"): Observable<PieChartDataDTO[]> {
        const url: string = this.basePath + `?type=${type}&date=${date}`;
        let data: PieChartDataDTO[] = [];
        return this.httpClient
            .get<PieChartDataDTO[]>(url)
            .pipe(
                tap((expenses: ExpenseDTO[]) => {
                    const obj: { [key: string]: number } = {};
                    for (let expense of expenses) {
                        if (!obj[<string>expense.categoryId]) {
                            obj[<string>expense.categoryId] = 0;
                        }
                        obj[<string>expense.categoryId] += <number>expense.amount;
                    }
                    data = Object.keys(obj).map(k => ({ amount: obj[k], categoryId: k }));
                }),
                concatMap((expenses: ExpenseDTO[]) => {
                    const categoryIds: string[] = expenses.map(e => <string>e.categoryId);
                    return this.categoryService.listCategoryByIdsUsingGET(categoryIds);
                }),
                map((categories: CategoryDTO[]) => {
                    let obj: { [key: string]: CategoryDTO } = {};
                    categories.forEach(item => obj[<string>item._id] = item);
                    data.forEach(item => {
                        item.category = {...obj[<string>item.categoryId]};
                    })
                    return data;
                })
            );
    }

    getLineChartDataUsingGET(type: "expense" | "income", date: "date" | "week" | "month" | "year"): Observable<LineChartDataDTO[]> {
        const url: string = this.basePath + `/line?type=${type}&date=${date}`;
        return this.httpClient
            .get<LineChartDataDTO[]>(url);
    }
}