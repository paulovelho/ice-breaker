import { Injectable } from '@angular/core';

import { DataLayerService } from '@app/services/data-layer.service';

import { Breaker } from './model';

@Injectable({
	providedIn: 'root'
})
export class BreakersService {

	constructor(
		private Service: DataLayerService,
	) { }

	public LoadItAll(): Promise<any> {
		return this.Service.InitializeDB();
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
					favorite: data.favorite,
				});
			});
	}

}
