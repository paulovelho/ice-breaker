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

	private lock: boolean = false;

  constructor(
		private Service: BreakersService,
	) { }

  ngOnInit() {}

  public next(): void {
  	if(this.lock) return;
		console.info("next");
		this.nextClick.emit(true);  	
  }

  public fav(): void {
  	this.lock = true;
		this.Service.InsertFavorite(this.breaker)
			.then(data => {
				this.breaker.favorite = true;
				this.lock = false;
			})
  }
  public unfav(): void {
  	this.lock = true;
  	this.Service.RemoveFavorite(this.breaker)
  		.then(data => {
  			this.breaker.favorite = false;
  			this.lock = false;
  		})
  }

}
