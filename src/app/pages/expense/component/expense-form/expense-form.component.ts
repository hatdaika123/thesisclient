import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseFormComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
