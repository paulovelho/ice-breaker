import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreditsComponent } from './components/credits/credits.component';
import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  	CreditsComponent,
  ],
	exports: [
		RouterModule,
	]
})
export class AboutModule { }
