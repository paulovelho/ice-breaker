import { Component, OnInit } from '@angular/core';

import { Breaker } from '@app/features/breakers/model';
import { BreakersService } from '@app/features/breakers/breakers.service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

	public front: Breaker = null;
	public back: Breaker = null;
	public viewBack: boolean = false;

	private lock: boolean = true;

	constructor(
		private Service: BreakersService,
	) { }

	ngOnInit() {
		this.start();
		this.watch();
	}

	private start(): void {
		this.Service.GetBreaker()
			.then((breaker) => {
				this.front = breaker;
				this.lock = false;
				this.LoadAnother();
			});
	}

	private watch(): void {
		this.Service.newBreaker	
			.subscribe((b) => {
				console.info("got new: ", b);
				if(this.viewBack) {
					this.front = b;
				} else {
					this.back = b;
				}
				this.lock = false;
			});
	}

	public LoadAnother(): void {
		this.Service.LoadOne();
	}

	public showNext(): void {
		console.info("loading another, lock: ", this.lock);
		if(this.lock) return;
		this.lock = true;
		this.viewBack = !this.viewBack;
		setTimeout(() => this.LoadAnother(), 750);
	}

}
