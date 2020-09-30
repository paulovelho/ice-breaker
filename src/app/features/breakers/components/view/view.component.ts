import { Component, OnInit } from '@angular/core';

import { BreakersService } from '@app/features/breakers/breakers.service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

	public content: string = "...";

	constructor(
		private Service: BreakersService,
	) { }

	ngOnInit() {
		this.GetBreaker();
	}

	public LoadAnother(): void {
		this.GetBreaker();
	}

	public GetBreaker(): void {
		this.content = "...";
		this.Service.GetBreaker()
			.then((b) => {
				console.info("breaker: ", b);
				this.content = b.content;
			})
			.catch(err => {
				console.error("error: ", err);
			});
	}

	public GoToSettings(): void {
		
	}

}
