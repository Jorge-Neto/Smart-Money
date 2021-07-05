import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  entry = {
    value: '0,00',
    category: 1
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  submitForm(){
    console.log('submit');
    console.log(this.entry);

    this.goBack();
  }

  goBack(){
    console.log('Go Back');
    this.navCtrl.navigateBack('/home');
  }
}
