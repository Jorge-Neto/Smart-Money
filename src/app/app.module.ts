import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewEntryPageModule } from './new-entry/new-entry.module';
import { SQLite } from '@ionic-native/sqlite/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NewEntryPageModule,
  ],
  providers: [{
    provide:
      RouteReuseStrategy,
    useClass: IonicRouteStrategy
  },
    SQLite],
  bootstrap: [AppComponent],
})
export class AppModule { }
