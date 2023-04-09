import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    private basePath: string = `${environment.api}/upload`;

    constructor(
        private httpClient: HttpClient
    ) { }

    uploadImages(files: File[]): Observable<string[]> {
        const url = `${this.basePath}/image`;
        const formData: FormData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }
        return this.httpClient
            .post<string[]>(url, formData);
    }
}