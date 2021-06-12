import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

/**
 * Diese Service-Klasse enthält Hilfsmethoden, die von mehreren Klassen der App
 * benötigt werden.
 */
@Injectable({
  providedIn: 'root'
})
export class HelferleinService {

  /**
   * Konstruktor für Dependency Injection.
   */    
  constructor(public alertController: AlertController,              
              public toastController: ToastController) {}


  /**
   * Hilfsmethode zum Anzeigen einer Nachricht in einem Toast-Objekt.
   * 
   * @param nachricht Text, der in Toast-Objekt angezeigt wird.
   */
   public async zeigeToast(nachricht: string)  {

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
  public async zeigeDialog(titel: string, nachricht: string) {

      const alert = await this.alertController.create({
        header: titel,
        message: nachricht,
        buttons : [ "Ok" ]
      });

      await alert.present();
  }  
}
