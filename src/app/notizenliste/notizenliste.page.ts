import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { HelferleinService } from '../helferlein.service';

@Component({
  selector: 'app-notizenliste',
  templateUrl: './notizenliste.page.html',
  styleUrls: ['./notizenliste.page.scss'],
})
export class NotizenlistePage implements OnInit {

   /**
    * Konstruktor für Dependency Injection.
    */
   constructor(public firebaseService: FirebaseService,
               public navCtrl: NavController,
               public alertCtrl: AlertController,
               public helferleinService: HelferleinService) {}

   /**
    * Holt Liste aller Notizen von Firestore.
    */
   public ngOnInit() {

      this.firebaseService.alleNotizenHolen();
   }

   /**
    * Event-Handler-Methode für Button "Abmelden".
    */
   public async onAbmeldenButton() {

      await this.firebaseService.abmelden();

      this.navCtrl.navigateForward("/home");
   }

   /**
    * Event-Handler zum Löschen einer Notiz. Vor dem eigentlichen Löschen
    * kommt eine Sicherheitsfrage.
    *
    * @param id  ID des Dokuments=Notiz, die gelöscht werden soll.
    */
   public async onNotizLoeschen(id: string) {

      const jaButtonEventHandler = async () => {

          await this.firebaseService.notizLoeschen(id);
          this.helferleinService.zeigeToast("Notiz wurde gelöscht.");
      };

      const neinButtonEventHandler = async () => {

        this.firebaseService.eigenesStatEventLoggen("notiz_loeschen_abgebrochen");
      };

      const jaButton   = { text: "Ja"  , handler: jaButtonEventHandler };
      const neinButton = { text: "Nein", handler: neinButtonEventHandler, role: "cancel" }

      const sicherheitsabfrageAlert =
          await this.alertCtrl.create({ header: "Sicherheitsfrage",
                                        message: "Soll diese Notiz wirklich gelöscht werden?",
                                        buttons: [ jaButton, neinButton ]
                                      });
      await sicherheitsabfrageAlert.present();
   }

}
