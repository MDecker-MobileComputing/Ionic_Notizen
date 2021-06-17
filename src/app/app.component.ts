import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HelferleinService } from './helferlein.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private afMessaging: AngularFireMessaging,
              private helferleinService: HelferleinService) {


    helferleinService.zeigeToast("App-Komponente aufgerufen");

    afMessaging.messages.subscribe( (nachricht) => {

      console.log("Push-Nachricht empfangen: " + JSON.stringify(nachricht));

      this.helferleinService.zeigeDialog("Benachrichtigung: " + nachricht["notification"].title,
                                         "Nachricht: " + nachricht["notification"].body
                                        );
    });
  }


}
