import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from  'firebase/app';

/**
 * Seite für Firebase-Authentifizierung nach folgender Anleitung:
 * https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
 * 
 * Im Firebase-Projekt muss Authentication aktiviert sein! (in Firebase-Projekt auf "Authentication")
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(public firebaseAuth: AngularFireAuth) {}

  
  /**
   * Event-Handler für Button "Login".
   */
  public onLoginButton() {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.signInWithPopup(googleAuthProvider);
    //this.firebaseAuth.signInWithRedirect(googleAuthProvider);
  }

}
