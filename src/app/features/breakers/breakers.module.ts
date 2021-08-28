import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LongPressDirective } from '@app/services/directives/longpress.directive';

import { BreakerCardComponent } from './components/breaker-card/breaker-card.component';
import { ViewComponent } from './components/view/view.component';
import { BreakersService } from './breakers.service';
import { FavoritesService } from './favorites.service';
import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LongPressDirective,
  	BreakerCardComponent,
  	ViewComponent,
  ],
  providers: [
  	BreakersService,
  	FavoritesService,
  ],
  exports:[
  	RouterModule
  ],
})
export class BreakersModule { }
