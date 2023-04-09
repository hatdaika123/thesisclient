import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management.component';
import { CategoryManagementRoutingModule } from './category-management.routing';
import { ButtonModule } from 'primeng/button';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryItemComponent } from './component/category-item/category-item.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    CategoryManagementComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryItemComponent
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ColorPickerModule,
    ToastModule,
    ProgressSpinnerModule,
    SkeletonModule,
    ConfirmDialogModule
  ]
})
export default class CategoryManagementModule { }
