import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HelferleinService } from '../helferlein.service';

@Component({
  selector: 'app-neuenotiz',
  templateUrl: './neuenotiz.page.html',
  styleUrls: ['./neuenotiz.page.scss'],
})
export class NeuenotizPage {

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public notizTitel: string = "";

  /** Member-Variable, ist mit Two-Way-Binding an <ion-input>-Element gebunden. */
  public notizBody: string = "";


  /**
   * Konstruktor für Dependency Injection.
   */  
  constructor(public firebaseService: FirebaseService,
              public helferleinService: HelferleinService) { }


  /**
   * Button für "Notiz anlegen".
   */
  public async onNotizAnlegenButton() {
        
    const notizTitelTrimmed = this.notizTitel.trim();
    if (notizTitelTrimmed.length === 0) {

      this.helferleinService.zeigeDialog("Ungültige Eingabe", "Keinen Titel für die Notiz eingegeben.")
      return;
    }

    const notizBodyTrimmed  = this.notizBody.trim();
    if (notizBodyTrimmed.length === 0) {

      this.helferleinService.zeigeDialog("Ungültige Eingabe", "Keinen Text für die Notiz eingegeben.")
      return;
    }

    await  this.firebaseService.neueNotizAnlegen(notizTitelTrimmed, notizBodyTrimmed);
    this.helferleinService.zeigeToast("Notiz wurde angelegt");
  }

}
