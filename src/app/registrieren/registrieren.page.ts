import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HelferleinService } from '../helferlein.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.page.html',
  styleUrls: ['./registrieren.page.scss'],
})
export class RegistrierenPage {

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public emailAdresse: string = "";

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public passwort1: string = "";

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public passwort2: string = "";


  /**
   * Konstruktor für Dependency Injection.
   */  
  constructor(public firebaseService: FirebaseService,
              public helferlein: HelferleinService) { }

  /**
   * Event-Handler für Button "Registrieren".
   */
  public async onRegistierenButton() {

    const emailTrimmed = this.emailAdresse.trim();

    if (emailTrimmed.length === 0) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Keine Email-Adresse eingegeben.");
      return;
    }
    if (emailTrimmed.length === 7) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Eingegebene Email-Adresse ist zu kurz.");
      return;
    }    
    if (emailTrimmed.indexOf("@") === -1) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Eingegebene Email-Adresse enthält kein \"@\".");
      return;
    }
    if (emailTrimmed.indexOf(".") === -1) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Eingegebene Email-Adresse enthält keinen Punkt.");
      return;
    }

    const passwort1Trimmed = this.passwort1.trim();
    const passwort2Trimmed = this.passwort2.trim();

    if (passwort1Trimmed.length === 0) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Kein Passwort eingegeben.");
      return;      
    }
    if (passwort1Trimmed.length === 8) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Passwort ist kürzer als acht Zeichen.");
      return;      
    }
    if (passwort1Trimmed !== passwort2Trimmed) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Wiederholung des Passworts stimmt nicht.");
      return;
    }

    const registrierungErfolgreich = this.firebaseService.registrieren(emailTrimmed, passwort1Trimmed);
    if (registrierungErfolgreich) {

      this.helferlein.zeigeDialog("Erfolg", "Registrierung war erfolgreich, es wurde eine Email zur Verifikation an die angegebene Adresse geschickt.");

    } else {

      this.helferlein.zeigeDialog("Fehler", "Registrierung ist fehlgeschlagen.");
    }    
  }

}
