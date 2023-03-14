import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'expense-history-item',
  templateUrl: './expense-history-item.component.html',
  styleUrls: ['./expense-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseHistoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
