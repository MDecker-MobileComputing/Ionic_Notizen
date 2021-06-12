import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.page.html',
  styleUrls: ['./registrieren.page.scss'],
})
export class RegistrierenPage {

  constructor(public firebaseService: FirebaseService) { }

}
