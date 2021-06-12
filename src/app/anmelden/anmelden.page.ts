import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AlertController, ToastController, NavController  } from '@ionic/angular';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.page.html',
  styleUrls: ['./anmelden.page.scss'],
})
export class AnmeldenPage  {

  public emailAdresse: string = "";

  public passwort: string = "";

  /**
   * Konstruktor für Dependency Injection
   */
  constructor(public firebaseService: FirebaseService,
              public alertController: AlertController,              
              public toastController: ToastController,
              public navController: NavController ) { }


  public async onAnmeldenButton() {

    if (this.emailAdresse.trim().length === 0) {

      this.zeigeDialog("Ungültige Eingabe", "Keine Email-Adresse zur Authentifzierung eingegeben.");
      return;
    }
    if (this.passwort.trim().length === 0) {

      this.zeigeDialog("Ungültige Eingabe", "Kein Passwort zur Authentifzierung eingegeben.");
      return;
    }

    const anmeldungErfolgreich = await this.firebaseService.anmelden(this.emailAdresse, this.passwort);
    if (anmeldungErfolgreich) {

      this.zeigeToast("Anmeldung war erfolgreich!");

    } else {

      this.zeigeDialog("Fehler", "Anmeldung ist fehlgeschlagen.");
    }
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
      buttons : [ "Ok" ]
    });

    await alert.present();
  }  

}
