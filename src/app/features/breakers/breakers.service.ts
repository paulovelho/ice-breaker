import { Injectable, Output, EventEmitter } from '@angular/core';

import { DataLayerService } from '@app/services/data-layer.service';

import { Breaker } from './model';

@Injectable({
	providedIn: 'root'
})
export class BreakersService {

	@Output() newBreaker = new EventEmitter<Breaker>();

	constructor(
		private Service: DataLayerService,
	) { }

	public LoadItAll(): Promise<any> {
		return this.Service.InitializeDB();
	}

	public LoadOne(): void {
		this.GetBreaker()
			.then((data: Breaker) => {
				this.newBreaker.emit(data);
			});
	}

	public async GetBreaker(): Promise<Breaker> {
		await this.LoadItAll();
		return this.Service.GetRandomBreaker()
			.then(data => {
				console.info("got: ", data);
				return new Breaker().from({
					content: data.content,
					id: data.id,
					category: data.category,
					favorite: false,
				});
			});
	}

	public async GetAllCategories(): Promise<any> {
		await this.LoadItAll();
		return this.Service.GetCategories()
			.then(data => {
				console.info("loaded");
			});
	}

}
