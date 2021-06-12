import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';

/**
 * Seite für Firebase-Authentifizierung nach folgender Anleitung:
 * https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
 * 
 * Im Firebase-Projekt muss Authentication aktiviert sein! (Firebase-Console: Authentication" in Firebase-Projekt)
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(public firebaseAuth: AngularFireAuth,
              public alertController: AlertController) {}


  /**
   * Event-Handler für Button "Login".
   * Nachdem Nutzer eingeloggt ist wird in Firebase-Console unter dem jeweiligen Firebase-Projekt
   * unter "Authentication | Users" aufgelistet.
   */
  public onLoginButton() {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.signInWithPopup(googleAuthProvider);
    //this.firebaseAuth.signInWithRedirect(googleAuthProvider);
  }


  /**
   * Event-Handler für Button "Logout"; zeigt zunächst eine Sicherheitsabfrage an.
   */
  public async onLogoutButton() {

    const alert = await this.alertController.create({
      header: "Sicherheitsfrage",
      message: "Wollen Sie sich wirklich abmelden?",
      buttons: [
        {
          text: "Nein",
          role: "cancel"
        }, {
          text: "Ja",
          handler: () => { this.ausloggen(); }
        }
      ]
    });

    await alert.present();    
  }


  /**
   * Methode für Durchführung Logout nach Bestätigung der Sicherheitsabfrage.
   */
  public ausloggen() {

    this.firebaseAuth.signOut();
  }  

}
