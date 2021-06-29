import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SQLite, SQLiteObject  } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController, 
    public sqlite: SQLite) { 
  }

  addEntry() {
    this.navCtrl.navigateForward('/new-entry');
  }

  testeDB() {
    console.log('Início do teste DB');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => console.log('BD Executado'))
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

}
