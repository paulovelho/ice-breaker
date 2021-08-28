import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';

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
	public longContent = false;
	public showCopied: boolean = false;

	private lock: boolean = false;
	private longPressed: boolean = false;

	constructor(
		private clipboard: Clipboard,
		private Service: BreakersService,
	) { }

	ngOnInit() {
	}

	public longPress(): void {
		this.longPressed = true;
		this.clipboard.copy(this.breaker.content);
		this.showCopied = true;
		window.setTimeout(() => {
			this.showCopied = false;
			this.longPressed = false;
		}, 2000);
		console.info('copied!');
	}

	public next(): void {
		if(this.lock) return;
		if(this.longPressed) {
			this.longPressed = false;
			return;
		}
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
