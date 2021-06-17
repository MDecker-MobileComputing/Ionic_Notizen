import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';


/*
 * Import von AngularFireModule nach
 * https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
 *
 * Import von AngularFireAnalyticsModule und ScreenTrackingService nach
 * https://github.com/angular/angularfire/blob/master/docs/analytics/getting-started.md#usage
 *
 * Import von AngularFireMessagingModule für Push-Nachrichten nach
 * https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md
 */
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAnalyticsModule,
            AngularFireMessagingModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
