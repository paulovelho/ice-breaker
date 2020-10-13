import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Breaker } from '@app/features/breakers/model';
import { BreakersService } from '@app/features/breakers/breakers.service';

@Component({
  selector: 'breaker-card',
  templateUrl: './breaker-card.component.html',
  styleUrls: ['./breaker-card.component.scss'],
})
export class BreakerCardComponent implements OnInit {

	@Input() breaker: Breaker = null;
	@Output() nextClick = new EventEmitter<any>();

  constructor(
		private Service: BreakersService,
	) { }

  ngOnInit() {}

  public next(): void {
  	console.info("emit next");
		this.nextClick.emit(true);  	
  }

}
