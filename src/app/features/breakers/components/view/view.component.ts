import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


import { Breaker } from '@app/features/breakers/model';
import { BreakersService } from '@app/features/breakers/breakers.service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

	public loading: boolean = false;
	public front: Breaker = null;
	public back: Breaker = null;
	public viewBack: boolean = false;
	public favorites: boolean = false;

	private lock: boolean = true;

	constructor(
		private loadingController: LoadingController,
		private alertController: AlertController,
		private Service: BreakersService,
	) { }

	ngOnInit() {
		this.start();
		this.watch();
	}

	ionViewWillEnter() {
		this.reset();
	}

	private async noFavorite(): Promise<any> {
		let alert = await this.alertController.create({
			message: "Nenhum Favorito Encontrado",
			buttons: ['OK'],
		})
		return alert.present();
	}

	private async noBreaker(): Promise<any> {
		let alert = await this.alertController.create({
			message: "Nenhuma Categoria Selecionada",
			buttons: ['OK'],
		})
		return alert.present();
	}

	private async reset(): Promise<any> {
		this.loading = true;
		let loadingLayer = await this.loadingController.create({
			message: "Carregando...",
		});
		this.front = null;
		this.back = null;
		this.viewBack = false;
		loadingLayer.present();
		this.start()
			.then(() => {
				loadingLayer.dismiss();
				this.loading = false;
			});
	}

	private firstBreaker(breaker): void {
		this.front = breaker;
		this.lock = false;
		console.info("loaded", breaker);
		this.LoadAnother();
	}

	private start(): Promise<any> {
		return new Promise((resolve, reject) => {
			if(this.favorites) {
				this.Service.GetFavorite()
					.then((breaker) => {
						if(!breaker) this.noFavorite();
						this.firstBreaker(breaker);
					})
					.finally(resolve);
			} else {
				this.Service.GetBreaker()
					.then((breaker) => {
						if(!breaker) this.noBreaker();
						this.firstBreaker(breaker);
					})
					.finally(resolve);
			}
		}); 
	}

	private watch(): void {
		this.Service.newBreaker	
			.subscribe((b) => {
				if(this.viewBack) {
					this.front = b;
				} else {
					this.back = b;
				}
				this.lock = false;
			});
	}

	public LoadAnother(): void {
		if(this.favorites) {
			this.Service.LoadFavorite();
		} else {
			this.Service.LoadOne();
		}
	}

	public showNext(): void {
		if(this.lock) return;
		this.lock = true;
		this.viewBack = !this.viewBack;
		setTimeout(() => this.LoadAnother(), 750);
	}

	public ToggleFavorites(): void {
		this.favorites = !this.favorites;
		this.reset();
	}

}
