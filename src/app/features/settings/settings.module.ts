import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SettingsService } from './settings.service';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  	PreferencesComponent
  ],
  providers: [
  	SettingsService,
  ],
  exports: [
  	RouterModule,
  ]
})
export class SettingsModule { }
