import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
