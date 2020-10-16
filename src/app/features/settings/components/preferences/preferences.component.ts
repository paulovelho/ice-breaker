import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { SettingsService } from './../../settings.service';
import { DataLayerService } from '@app/services/data-layer.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {

	private loading;
	public categories: Array<any> = [];

  constructor(
  	private loadingController: LoadingController,
  	private Service: SettingsService,
  	private DataService: DataLayerService,
  ) { }

  ngOnInit() {
  	this.showLoading().then(() => {
	  	this.LoadCategories();
  	});
  }

  private LoadCategories(): void {
  	this.DataService.GetCategories()
  		.then((data) => {
  			console.info("got categories: ", data);
  			this.loading.dismiss();
  			this.categories = data;
  		});
  };
	
	public async showLoading(message?: string) {
		if(!message) message = "Carregando...";
	  this.loading = await this.loadingController.create({
	    message: message,
	  });

	  await this.loading.present();
	}

	public reset() {
		if(confirm("Deseja apagar todos os dados?")) {
			this.showLoading();
			this.Service.reset()
				.then(data => {
					if(this.loading)
						this.loading.dismiss();
				});
		}
	}
}
