import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

/**
 * Service-Klasse, die alle Firebase-spezifischen Funktionen (Authentifizierung, Zugriff auf Firestore) kapselt.
 *
 * Siehe auch: https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /** Eindeutige ID des derzeit angemeldeten Nutzer oder leerer String, wenn niemand angemeldet ist. */
  public nutzerUid = "";

  /** Member-Variable, hat Wert `true` gdw. wenn gerade ein Nutzer angemeldet ist. */
  public istNutzerAngemeldet = false;

  /** Anzeigename des aktuell angemeldeten Benutzers oder leerer String. */
  public nutzername = "";


  /**
   * Konstruktor für Dependency Injection.
   *
   * Definiert auch eine Callback-Methode für Änderungen des Authentication-Status, siehe auch
   * https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
   */
  constructor(public firebaseAuth: AngularFireAuth,
              private firestore: AngularFirestore) {

    this.firebaseAuth.authState.subscribe(user => {

      if (user !== null) {

        this.istNutzerAngemeldet = true;
        this.nutzername          = user.email;
        this.nutzerUid           = user.uid;
        console.log(`Nutzer angemeldet; Email-Adresse bestätigt: ${user.emailVerified}`);

      } else {

        this.istNutzerAngemeldet = false;
        this.nutzername          = "";
        console.log("Kein Nutzer angemeldet.");
      }

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
   * Nutzer ausloggen.
   */
  public async abmelden() {

    this.firebaseAuth.signOut();
  }


  public async neueNotizAnlegen(titel: string, inhalt: string) {

    let nowMillisecondsSince1970 = new Date().valueOf();

    let documentReference = await this.firestore.collection("notizensammlung").add({
      nutzer_uid: this.nutzerUid,
      titel: titel,
      inhalt: inhalt,
      zeitstempel: nowMillisecondsSince1970
    });

    console.log(`Neue Notiz wurde angelegt: ID=${documentReference.id}, Pfad=${documentReference.path}`);
  }  

}
