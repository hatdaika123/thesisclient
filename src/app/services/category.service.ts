import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryDTO } from "../models/CategoryDTO.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private basePath: string = `${environment.api}/category`;
  private iconPack$?: Observable<CategoryDTO[]>;

  constructor(
    private httpClient: HttpClient
  ) { }

  listAllUserCategoryUsingGET(): Observable<CategoryDTO[]> {
    const url: string = this.basePath;
    return this.httpClient
      .get<CategoryDTO[]>(url);
  }

  listCategoryByIdsUsingGET(ids: string[]): Observable<CategoryDTO[]> {
    const url: string = this.basePath + `?id=${ids.join(',')}`;
    return this.httpClient
      .get<CategoryDTO[]>(url);
  }

  listAllCategoryIconUsingGET(): Observable<CategoryDTO[]> {
    const url: string = `${this.basePath}/icon/pack`;
    if (!this.iconPack$) {
      this.iconPack$ = this.httpClient
        .get<CategoryDTO[]>(url)
        .pipe(
          shareReplay(1)
        );
    }
    return this.iconPack$;
  }

  saveCategoryUsingPOST(category: CategoryDTO): Observable<any> {
    const url: string = this.basePath;
    return this.httpClient
      .post(url, category);
  }

  findCategoryByIdUsingGET(id: string): Observable<CategoryDTO> {
    const url: string = `${this.basePath}/${id}`;
    return this.httpClient
      .get<CategoryDTO>(url);
  }

  deleteCategoryByIdUsingDELETE(id: string): Observable<any> {
    const url: string = `${this.basePath}/${id}`;
    return this.httpClient
      .delete(url);
  }
}