import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  entries = [];

  constructor(
    private navCtrl: NavController,
    public sqlite: SQLite) {
  }
  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log('teste Nav');
    this.navCtrl.navigateForward('/new-entry');
  }

  loadData() {
    this.entries = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // db.sqlBatch([
        //   'DROP TABLE entries'
        // ]);
        // console.log('bd removido');

        const sql = 'SELECT * FROM entries;';
        const data = [];

        return db.executeSql(sql, data)
          .then((values: any) => {
            let dado;
            for (let i = 0; i < values.rows.length; i++) {
              dado = values.rows.item(i);
              console.log(JSON.stringify(dado));
              this.entries.push(dado);
            }
          })
          .catch(e => console.log('Erro ao realizar o Select', JSON.stringify(e)));
      })
      .catch(e => console.log(e));
  }

  createTable(db) {
    return db.sqlBatch([
      'CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)'
    ])
      .catch(e => console.log('Erro ao criar tabela', JSON.stringify(e)));
  }

  insertFunction(v1, v2, db) {
    const sql = 'INSERT INTO entries (amount, description) VALUES (?, ?)';
    const data = [v1, v2];
    //Insert
    return db.executeSql(sql, data)
      .catch(e => console.log('Erro ao insertar', JSON.stringify(e)));
  }

  updateFunction(v1, v2, id, db) {
    const sql = 'UPDATE entries SET amount = ?,  description = ? WHERE id = ?';
    const data = [v1, v2, id];
    // Update
    return db.executeSql(sql, data)
      .catch(e => console.log('Erro ao insertar', JSON.stringify(e)));
  }

  deleteFunction(id, db) {
    const sql = 'DELETE FROM entries WHERE id = ?';
    const data = [id];

    return db.executeSql(sql, data)
      .catch(e => console.log('Erro ao deletar', JSON.stringify(e)));
  }

  selectFunction(db) {
    const sql = 'SELECT * FROM entries;';
    const data = [];

    return db.executeSql(sql, data)
      .catch(e => console.log('Erro ao realizar o Select', JSON.stringify(e)));
  }

  balance(db) {
    const sql = 'SELECT SUM(amount) AS balance FROM entries;';
    const data = [];

    return db.executeSql(sql, data)
      .catch(e => console.log('Erro ao selecionar registro', JSON.stringify(e)));
  }
}
