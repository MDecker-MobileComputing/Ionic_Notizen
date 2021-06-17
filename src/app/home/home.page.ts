import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { mergeMapTo } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HelferleinService } from '../helferlein.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(public firebaseService: FirebaseService,
              private afMessaging: AngularFireMessaging,
              private helferleinService: HelferleinService) {}

  /**
   * Event-Handler-Methode für Button "Push-Nachrichten abonnieren".
   */
  public onAbonnierenButton() {

    this.afMessaging
        .requestPermission
        .pipe(mergeMapTo(this.afMessaging.tokenChanges))
        .subscribe(

      (token) => { console.log("Token für Push-Nachrichten: " + token);
                   this.helferleinService.zeigeToast("Push-Nachrichten abonniert.")
                 },

      (fehler) => { this.helferleinService.zeigeDialog("Fehler",
                                                       "Fehler beim Abonnieren der Nachrichten: " + fehler)
                  }
    );
  }

}
