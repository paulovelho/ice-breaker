import { Component, Input, OnInit } from '@angular/core';

import * as Breakers from '@app/features/breakers';

@Component({
  selector: 'breaker-card',
  templateUrl: './breaker-card.component.html',
  styleUrls: ['./breaker-card.component.scss'],
})
export class BreakerCardComponent implements OnInit {

	@Input() breaker: Breakers.Model = null;
	@Input() next: Breakers.Model = null;

  constructor() { }

  ngOnInit() {}

}
