import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HelferleinService } from '../helferlein.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.page.html',
  styleUrls: ['./anmelden.page.scss'],
})
export class AnmeldenPage  {

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public emailAdresse: string = "";

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */  
  public passwort: string = "";

  /**
   * Konstruktor für Dependency Injection
   */
  constructor(public firebaseService: FirebaseService,
              public helferlein: HelferleinService,
              private navController  : NavController ) { }


  /**
   * Event-Handler-Methode für Button "Anmelden".
   */
  public async onAnmeldenButton() {

    if (this.emailAdresse.trim().length === 0) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Keine Email-Adresse zur Authentifzierung eingegeben.");
      return;
    }
    if (this.passwort.trim().length === 0) {

      this.helferlein.zeigeDialog("Ungültige Eingabe", "Kein Passwort zur Authentifzierung eingegeben.");
      return;
    }

    const anmeldungErfolgreich = await this.firebaseService.anmelden(this.emailAdresse, this.passwort);
    if (anmeldungErfolgreich) {

      this.helferlein.zeigeToast("Anmeldung war erfolgreich!");
      this.navController.navigateForward("/notizenliste");

    } else {

      this.helferlein.zeigeDialog("Fehler", "Anmeldung ist fehlgeschlagen.");
    }    
  }

}
