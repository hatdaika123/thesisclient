import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  public url = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
