import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-notizenliste',
  templateUrl: './notizenliste.page.html',
  styleUrls: ['./notizenliste.page.scss'],
})
export class NotizenlistePage {

  /**
   * Konstruktor für Dependency Injection.
   */  
   constructor(public firebaseService: FirebaseService) {}


}
