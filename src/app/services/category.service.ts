import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryDTO } from "../models/CategoryDTO.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private basePath: string = `${environment.api}/category`;

  constructor(
    private httpClient: HttpClient
  ) { }

  listAllUserCategoryUsingGET(): Observable<CategoryDTO> {
    const url: string = this.basePath;
    return this.httpClient
      .get<CategoryDTO>(url);
  }

  listAllCategoryIconUsingGET(): Observable<CategoryDTO[]> {
    const url: string = `${this.basePath}/icon/pack`;
    return this.httpClient
      .get<CategoryDTO[]>(url);
  }

  saveCategoryUsingPOST(category: CategoryDTO): Observable<any> {
    const url: string = this.basePath;
    return this.httpClient
      .post(url, category);
  }
}