import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
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
              public alertController: AlertController,
              public toastController: ToastController,
              public ngZone: NgZone ) {}


  /**
   * Event-Handler für Button "Login".
   * Nachdem Nutzer eingeloggt ist wird in Firebase-Console unter dem jeweiligen Firebase-Projekt
   * unter "Authentication | Users" aufgelistet.
   * In Callback-Methoden müssen Zugriffe auf Ionic mit `ngZone` ausgeführt werden, siehe auch
   * https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
   */
  public async onLoginButton() {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.signInWithPopup(googleAuthProvider)
        .then( () => { 
          this.ngZone.run(() => {
            this.zeigeToast("Login erfolgreich."); 
          });          
        })
        .catch((fehler) => {
          this.ngZone.run(() => {
            this.zeigeDialog("Fehler bei Login", fehler + "");
          });          
        });
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


  /**
   * Hilfsmethode zum Anzeigen einer Nachricht in einem Toast-Objekt.
   * 
   * @param nachricht Text, der in Toast-Objekt angezeigt wird.
   */
  private async zeigeToast(nachricht: string)  {
    const toast = await this.toastController.create({
      message: nachricht,
    });
    await toast.present();
  }


  /**
   * Hilfsmethode zum Anzeigen einer Nachrichten in einem Dialog.
   * 
   * @param titel  Überschrift des Dialogs.
   * @param nachricht  Eigentliche Nachricht des Dialogs.
   */
  private async zeigeDialog(titel: string, nachricht: string) {

    const alert = await this.alertController.create({
      header: titel,
      message: nachricht,
    });

    await alert.present();
  }

}
