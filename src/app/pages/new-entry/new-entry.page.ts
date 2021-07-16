import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  entryForm: FormGroup;

  entry = {
    amount: 0.00,
    categoryId: '',
  };

  constructor(
    private navCtrl: NavController,
    public builder: FormBuilder,
    public sqlite: SQLite
  ) {
    this.entryForm = builder.group({
      amount: new FormControl('', Validators.compose([Validators.required])),
      categoryId: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  submitForm() {
    console.log('submit');
    this.insertBD();
    this.goBack();
  }

  goBack() {
    console.log('Go Back');
    this.navCtrl.navigateBack('/home');
  }

  insertBD() {
    console.log('Uso do BD');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.sqlBatch([
        'CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)'
      ])
      .then(() => {
        const sql = 'INSERT INTO entries (amount, description) VALUES (?, ?)';
        const data = [this.entry.amount, this.entry.categoryId];
        //Insert
        return db.executeSql(sql, data)
        .then(() => console.log('Insert realizado'));
      }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
  }
}
