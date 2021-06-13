import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

/**
 * Service-Klasse, die alle Firebase-spezifischen Funktionen (Authentifizierung, Zugriff auf Firestore) kapselt.
 *
 * Siehe auch: https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public userObject: any;

  /**
   * Konstruktor für Dependency Injection.
   *
   * Subscribed auch den Authentication State nach
   * https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
   */
  constructor(public firebaseAuth: AngularFireAuth) {

    this.firebaseAuth.authState.subscribe(user => {

      const userStr = JSON.stringify(user);

      console.log(`Neuer Auth-Status: ${userStr}`);
    });

  }


  /**
   * Nutzer anhand von Email-Adresse und Passwort anmelden.
   *
   * @param email  Vom Nutzer eingegebene Email-Adresse
   * @param passwort Vom Nutzer eingegebenes Passwort
   *
   * @return Promise auf bool'schen Wert; wenn `true`, dann war die Anmeldung erfolgreich.
   */
  public async anmelden(email: string, passwort: string): Promise<boolean> {

    try {

      const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(email, passwort);
      return userCredential.user !== null;
    }
    catch (fehler) {

      console.log(`Fehler bei Anmeldung: ${fehler}`);
      return false;
    }
  }


  /**
   * Neuen Nutzer mit Email-Adresse und Passwort gelesen; es wird auch die Verifikations-Email verschickt
   *
   * @return Promise auf bool'schen Wert; wenn `true`, dann war die Registrierung erfolgreich.
   */
  public async registrieren(email: string, passwort: string): Promise<boolean> {

    try {

      const userCredential = await this.firebaseAuth.createUserWithEmailAndPassword(email, passwort);

      userCredential.user.sendEmailVerification();

      return userCredential.user !== null;
    }
    catch (fehler) {

      console.log(`Fehler bei Anmeldung: ${fehler}`);
      return false;
    }
  }


  /**
   * Aktuellen angemeldeten Nutzer abfragen.
   * @returns  Nutzerobjekt oder `null` wenn nicht angemeldet.
   */
  public async getNutzer(): Promise<firebase.User> {

     const nutzerObservable = this.firebaseAuth.user;
     return nutzerObservable.toPromise();
  }

  public async abmelden() {

    this.firebaseAuth.signOut();
  }

}
