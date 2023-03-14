import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryManagementComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
