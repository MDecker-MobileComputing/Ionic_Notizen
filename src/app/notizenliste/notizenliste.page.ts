import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

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
               public navCtrl: NavController) {}


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

}
