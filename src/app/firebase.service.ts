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

  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(public firebaseAuth: AngularFireAuth) { }


  /**
   * Nutzer anhand von Email-Adresse und Passwort anmelden.
   * @param email  Vom Nutzer eingegebene Email-Adresse
   * @param passwort Vom Nutzer eingegebenes Passwort
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

  public async getNutzer(): Promise<firebase.User> {

     const nutzerObservable = this.firebaseAuth.user;
     return nutzerObservable.toPromise();
  }


}
