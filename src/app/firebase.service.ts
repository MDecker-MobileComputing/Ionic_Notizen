import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

import { first } from 'rxjs/operators';
import { Notiz } from './notiz';


/**
 * Service-Klasse, die alle Firebase-spezifischen Funktionen (Authentifizierung, Zugriff auf Firestore) kapselt.
 *
 * Siehe auch: https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
 *
 * Für Konfiguration der Zugriffsregel für Firestore: siehe README-Datei dieses Repos.
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

  /** Firestore-Collection mit alle Notizen, wird bei Bedarf initialisiert. */
  private notizenCollectionRef: AngularFirestoreCollection = null;

  /** Array mit von der DB gelesenen Notizen. */
  public notizenArray: Notiz[] = [];


  /**
   * Konstruktor für Dependency Injection.
   *
   * Definiert auch eine Callback-Methode für Änderungen des Authentication-Status, siehe auch
   * https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
   */
  constructor(private firebaseAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private fireAnalytics: AngularFireAnalytics) {

    this.firebaseAuth.authState.subscribe(user => {

      if (user !== null) {

        this.istNutzerAngemeldet = true;
        this.nutzername          = user.email;
        this.nutzerUid           = user.uid;
        console.log(`Nutzer angemeldet: Email-Adresse bestätigt: ${user.emailVerified}, nutzerUid=${this.nutzerUid}`);

      } else {

        this.istNutzerAngemeldet = false;
        this.nutzername          = "";
        console.log("Kein Nutzer angemeldet.");
      }

      /*
      const userStr = JSON.stringify(user);
      console.log(`Neuer Auth-Status: ${userStr}`);
      */
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

      //userCredential.user.sendEmailVerification();

      return userCredential.user !== null;
    }
    catch (fehler) {

      console.log(`Fehler bei Anmeldung: ${fehler}`);
      return false;
    }
  }


  /**
   * Nutzer abmelden (ausloggen).
   */
  public async abmelden() {

    this.firebaseAuth.signOut();
  }


  /**
   * Legt eine neue Notiz in der Collection "notizensammlung" an; neben den als Argument übergebenen
   * `titel` und `inhalt` werden noch der aktuelle Zeitstempel als Anzahl Millisekunden seit dem
   * 1. Januar 1970 sowie die Nutzer-ID abgespeichert.
   *
   * @param titel   Titel der Notiz
   * @param inhalt  Eigentlicher Text der Notiz.
   */
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


  /**
   * Methode holt alle Notizen für den aktuellen Nutzer.
   *
   * Die Nutzer-ID für die `WHERE`-Bedingung kann nicht aus der Member-Variable `nutzerUid` ausgelesen
   * werden, weil diese zum Zeitpunkt des Aufrufs dieses Methode wahrscheinlich noch nicht gefüllt ist.
   * Es wird deshalb vor der Query die User-ID separat abgefragt.
   */
  public async alleNotizenHolen() {

    this.notizenArray = [];

    // Lösung nach https://fireship.io/snippets/get-angularfire-userid-as-promise/
    const authStatePromise = this.firebaseAuth.authState.pipe( first() ).toPromise();
    const authState = await authStatePromise;
    const nutzerUid = authState.uid;

    //console.log(`nutzer_uid=${nutzerUid}`);

    // Der Methode valuesChanges() muss ein Argument übergeben werden, damit die ID-Werte
    // der Datensätze/Dokumente zurückgegeben werden ( https://stackoverflow.com/a/59902473 ).
    //
    // Für das orderBy() muss folgender Index für die Collection "notizensammlung" angelegt werden:
    // nutzer_uid Aufsteigend zeitstempel Aufsteigend
    this.firestore.collection("notizensammlung", ref => ref.where("nutzer_uid", "==", nutzerUid)
                                                           .orderBy("zeitstempel") )
                  .valueChanges( { idField: "id" } )
                  .subscribe( ergebnisArray => {

                      for (let i = 0; i < ergebnisArray.length; i++) {

                          const ergebnis = ergebnisArray[i];

                          const notizObj = new Notiz( ergebnis["id"         ], 
                                                      ergebnis["titel"      ], 
                                                      ergebnis["inhalt"     ], 
                                                      ergebnis["zeitstempel"]
                                                    );
                          this.notizenArray.push(notizObj);
                      }
                  } );
  }


  /**
   * Einzelne Notiz anhand deren ID löschen.
   *
   * @param docID  ID der zu löschenden Notiz
   */
  public async notizLoeschen(docID: string) {

    // Lösung nach https://github.com/angular/angularfire/issues/1265#issue-265459651

    if (this.notizenCollectionRef === null) {

      this.notizenCollectionRef = this.firestore.collection("notizensammlung");
    }

    const notizenDoc = this.notizenCollectionRef.doc(docID);
    await notizenDoc.delete();

    await this.alleNotizenHolen();
  }

  /**
   * Methode, um eigenes Event für Google Analytics zu loggen.
   *
   * @param eventName  Name des Events, z.B. "notiz_geloescht".
   * @param attributeObj  Optionales Objekt mit Attributen.
   */
  public eigenesStatEventLoggen(eventName: string, attributeObj = {}) {

        const anzAttribute = Object.keys(attributeObj).length;

        if (anzAttribute === 0) {

          this.fireAnalytics.logEvent(eventName);

        } else {

          this.fireAnalytics.logEvent(eventName, attributeObj);
        }

        console.log(`Event geschrieben: ${eventName} (Anzahl Attribute: ${anzAttribute}).`);
  }

}
