import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ExpenseDTO } from 'src/app/models/ExpenseDTO.model';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'expense-history-item',
  templateUrl: './expense-history-item.component.html',
  styleUrls: ['./expense-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseHistoryItemComponent implements OnInit {

  @Input() data?: ExpenseDTO;

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
