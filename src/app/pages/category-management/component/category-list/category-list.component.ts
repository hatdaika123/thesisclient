import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { CategoryService } from 'src/app/services/category.service';
import { alertError } from 'src/app/utils/helpers';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class CategoryListComponent implements OnInit {

  public categories: CategoryDTO[] = [];
  public loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    if (this.loading) return;
    this.showLoading();

    this.categoryService
      .listAllUserCategoryUsingGET()
      .subscribe({
        next: res => {
          this.categories = res;
          this.hideLoading();
          this.cd.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
          this.hideLoading();
        }
      });
  }

  showLoading(): void {
    this.loading = true;
    this.cd.detectChanges();
  }

  hideLoading(): void {
    this.loading = false;
    this.cd.detectChanges();
  }

}
