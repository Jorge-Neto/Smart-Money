import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  teste = 1;
  constructor(private navCtrl: NavController) { }

  addEntry() {
    console.log("Olá");

    this.teste += 1;

    this.navCtrl.navigateForward('/new-entry');
  }

}
