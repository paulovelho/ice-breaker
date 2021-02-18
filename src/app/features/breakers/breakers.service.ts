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

	public LoadFavorite(): void {
		this.GetFavorite()
			.then((data: Breaker) => {
				this.newBreaker.emit(data);
			});
	}

	private BreakerFromData(data, fav: boolean = false): Breaker {
		if(!data) return null;
		return new Breaker().from({
			hash: data.hash,
			content: data.content,
			id: data.id,
			category: data.category,
			favorite: fav,
		});		
	}

	public async GetBreaker(): Promise<Breaker> {
		await this.LoadItAll();
		return this.Service.GetRandomBreaker()
			.then(data => this.BreakerFromData(data));
	}

	public async GetFavorite(): Promise<Breaker> {
		await this.LoadItAll();
		return this.Service.GetFavoriteBreaker()
			.then(data => this.BreakerFromData(data, true));
	}

	public InsertFavorite(b: Breaker): Promise<any> {
		return this.Service.InsertFavorite(b);
	}
	public RemoveFavorite(b: Breaker): Promise<any> {
		return this.Service.RemoveFavorite(b.id);
	}

	public async GetAllCategories(): Promise<any> {
		await this.LoadItAll();
		return this.Service.GetCategories();
	}

}
