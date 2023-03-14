import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { CategoryService } from 'src/app/services/category.service';
import { alertError, alertSuccess, UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class CategoryFormComponent implements OnInit {

  public urlHelper = UrlHelper;
  public iconPack: CategoryDTO[] = [];
  public form?: FormGroup;
  public submitting: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadIconPack();
    this.categoryService
      .listAllUserCategoryUsingGET()
      .subscribe(console.log);

    this.initForm();
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

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      color: ['#0abde3', Validators.required],
      icon: ['', Validators.required]
    });
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

}
