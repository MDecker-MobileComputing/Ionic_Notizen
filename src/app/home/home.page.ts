import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public nutzerEmail: string = "";

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public nutzerPasswort: string = "";

  /**
   * Konstruktor für Dependency Injection.
   */  
  constructor(public alertController: AlertController,              
              public toastController: ToastController,
              public firebaseService: FirebaseService,
             ) {}


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
