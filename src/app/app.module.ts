import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DataLayerService } from './services/data-layer.service';
import { SqliteService } from './services/sql/sqlite.service';
import { SqlbrowserService } from './services/sql/sqlbrowser.service';
import { LoaderService } from './services/data/loader.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	FormsModule,
  	IonicModule.forRoot(),
  	AppRoutingModule,
  	HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'SQLService', useClass: SqlbrowserService },
    LoaderService,
    DataLayerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
