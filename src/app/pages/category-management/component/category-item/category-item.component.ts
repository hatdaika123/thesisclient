import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent implements OnInit {

  @Input() data?: CategoryDTO;
  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
