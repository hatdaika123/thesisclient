import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseListComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
