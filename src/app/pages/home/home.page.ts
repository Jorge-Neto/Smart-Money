import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from './../../services/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  entries = [];

  constructor(
    private navCtrl: NavController,
    public accountService: AccountService) {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log('teste Nav');
    this.navCtrl.navigateForward('/new-entry');
  }

  loadData() {
    this.accountService.allEntries()
      .then((values: any) => {
        let dado;
        this.entries = [];

        for (let i = 0; i < values.rows.length; i++) {
          dado = values.rows.item(i);
          console.log(JSON.stringify(dado));
          this.entries.push(dado);
        }
      });
  }
}
