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


@NgModule({
  declarations: [
    CategoryManagementComponent,
    CategoryFormComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ColorPickerModule,
    ToastModule
  ]
})
export default class CategoryManagementModule { }
