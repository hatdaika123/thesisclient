import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    private basePath: string = `${environment.api}/statistic`;

    constructor(
        private httpClient: HttpClient
    ) { }

    getOverviewSummaryUsingGET(): Observable<{ income: number, expense: number }> {
        const url: string = this.basePath + '/summary';
        return this.httpClient
            .get<{ income: number, expense: number }>(url);
    }
}