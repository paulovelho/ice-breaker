import { Injectable, Output, EventEmitter } from '@angular/core';

import { DataLayerService } from '@app/services/data-layer.service';

import { Breaker } from './model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

	@Output() newBreaker = new EventEmitter<Breaker>();
	@Output() isActive = new EventEmitter<boolean>();

	constructor(
		private Service: DataLayerService,
	) { }

	public GetFavorite(): Promise<Breaker> {
		return this.Service.GetFavoriteBreaker()
			.then(data => {
				console.info("got: ", data);
				return new Breaker().from({
					content: data.content,
					id: data.id,
					category: data.category,
					favorite: true,
				});
			});
	}


}
