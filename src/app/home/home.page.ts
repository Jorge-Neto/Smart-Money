import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private sqlite: SQLite) {
  }

  addEntry() {
    console.log('teste Nav');
    this.navCtrl.navigateForward('/new-entry');
  }

  testeDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // db.sqlBatch([
        //   'DROP TABLE entries'
        // ])
        //   .catch(e => console.log('Erro ao criar tabela', JSON.stringify(e)));
        this.createTable(db)
          .then(() => {

            this.selectFunction(db)
              .then((values: any) => {
                for (let i = 0; i < values.rows.length; i++) {
                  console.log(JSON.stringify(values.rows.item(i)));
                }

                this.balance(db)
                  .then((value: any) => {
                    if (value.rows.length > 0) {
                      const item = value.rows.item(0);
                      console.log(JSON.stringify(item.balance));
                    }
                  });
              });
          });
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
    const sql = 'SELECT id, amount, description FROM entries;';
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
