import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './components/view/view.component';
import { BreakersService } from './breakers.service';
import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  	ViewComponent
  ],
  providers: [
  	BreakersService,
  ],
  exports:[
  	RouterModule
  ],
})
export class BreakersModule { }
