import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Seite für Firebase-Authentifizierung gem. folgender Anleitung:
 * https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public firebaseAuth: AngularFireAuth) {}

}
