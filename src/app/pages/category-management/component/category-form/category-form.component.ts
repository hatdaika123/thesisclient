import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { CategoryService } from 'src/app/services/category.service';
import { alertError, alertSuccess, UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export class CategoryFormComponent implements OnInit {

  public urlHelper = UrlHelper;
  public iconPack: CategoryDTO[] = [];
  public form?: FormGroup;
  public submitting: boolean = false;
  public deleting: boolean = false;
  public loading: boolean = false;
  public category?: CategoryDTO;

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadIconPack();
    this.activatedRoute
      .params
      .subscribe({
        next: res => {
          if (!res['id']) {
            this.initForm();
            return;
          }
          this.loadCategoryThenInitForm(res['id']);
        }
      });
  }

  loadIconPack(): void {
    this.categoryService
      .listAllCategoryIconUsingGET()
      .subscribe({
        next: res => {
          this.iconPack = res;
          this.cd.detectChanges();
        }
      });
  }

  loadCategoryThenInitForm(id: string): void {
    if (this.loading) return;
    this.showLoading();

    this.categoryService
      .findCategoryByIdUsingGET(id)
      .subscribe({
        next: res => {
          if (!res) {
            this.initForm();
            return;
          }
          this.category = res;
          this.initForm(this.category);
          this.hideLoading();
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
          this.hideLoading();
        }
      });
  }

  initForm(category?: CategoryDTO): void {
    const DEFAULT_COLOR = '#0abde3';
    this.form = this.fb.group({
      _id: [category?._id],
      name: [category?.name, Validators.required],
      description: [category?.description],
      color: [category?.color || DEFAULT_COLOR, Validators.required],
      icon: [category?.icon, Validators.required]
    });
    this.cd.detectChanges();
  }

  submit(): void {
    if (this.form?.invalid) return;
    if (this.submitting) return;
    this.submitting = true;

    this.categoryService
      .saveCategoryUsingPOST(
        this.form?.getRawValue()
      )
      .subscribe({
        next: _ => {
          alertSuccess(this.messageService);
          this.submitting = false;
          this.router.navigateByUrl(this.urlHelper.categoryManagement());
        },
        error: err => {
          alertError(this.messageService, err);
          this.submitting = false;
        }
      })
  }

  showLoading(): void {
    this.loading = true;
    this.cd.detectChanges();
  }

  hideLoading(): void {
    this.loading = false;
    this.cd.detectChanges();
  }

  onDeleteClicked(): void {
    if (!this.category?._id) return;

    this.confirmationService.confirm({
      message: "Are you sure to delete this category?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategoryById(<string>this.category?._id);
      }
    });
  }

  deleteCategoryById(id: string): void {
    if (this.deleting) return;
    this.deleting = true;

    this.categoryService
      .deleteCategoryByIdUsingDELETE(id)
      .subscribe({
        next: _ => {
          alertSuccess(this.messageService, 'Deleted.');
          this.deleting = false;
          this.router.navigateByUrl(this.urlHelper.categoryManagement());
        },
        error: (err: HttpErrorResponse) => {
          this.deleting = false;
          alertError(this.messageService, err.error);
        }
      })
  }
}
