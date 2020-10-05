import { Component, OnInit } from '@angular/core';

import * as Breakers from '@app/features/breakers';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

	public breaker: Breakers.Model = null;
	public next: Breakers.Model = null;

	constructor(
		private Service: Breakers.Service,
	) { }

	ngOnInit() {
		this.watch();
	}

	private watch(): void {
		this.Service.newBreaker	
			.subscribe((b) => {
				if(!this.next) {
					this.next = b;
					this.LoadAnother();
				} else {
					this.breaker = b;
				}
			});
		this.LoadAnother();
	}

	public LoadAnother(): void {
		this.Service.LoadOne();
	}

}
