import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Console } from 'console';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbConnection: SQLiteObject;

  constructor(public sqlite: SQLite) {
    this.initDB();
  }

  get db(): SQLiteObject {
    return this.dbConnection;
  }

  private initDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.dbConnection = db;

      // this.dropTables();
      this.createTables();
      this.loadRecords();
    }).catch(e => console.log(e));
  }

  private createTables() {
    console.log('creating tables...');
    this.dbConnection.sqlBatch([
      // eslint-disable-next-line max-len
      ['CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, color CHARACTER(9) default "#ffffff", is_default BOOLEAN);'],
      // eslint-disable-next-line max-len
      ['CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL NOT NULL, description TEXT, entry_at DATETIME NOT NULL, is_init BOOLEAN, category_id INTEGER);']
    ])
      .then(() => console.log('tables created successfully'))
      .catch(e => console.log('error on create tables', JSON.stringify(e)));
  }

  private loadRecords() {
    console.log('loading default data...');

    this.dbConnection.executeSql('SELECT COUNT(id) as categorias FROM categories', [])
      .then((data: any) => {
        console.log('categories in db', data.rows.item(0).categorias);

        if (data.rows.item(0).categorias === 0) {
          this.dbConnection.sqlBatch([
            ['INSERT INTO categories (name) values (?)', ['Alimentação']],
            ['INSERT INTO categories (name) values (?)', ['Cuidados Pessoais']],
            ['INSERT INTO categories (name) values (?)', ['Dívidas ou Empréstimos']],
            ['INSERT INTO categories (name) values (?)', ['Investimentos']],
            ['INSERT INTO categories (name) values (?)', ['Lazer']],
            ['INSERT INTO categories (name) values (?)', ['Mercado']],
            ['INSERT INTO categories (name) values (?)', ['Saúde']],
            ['INSERT INTO categories (name) values (?)', ['Veículo']],
            ['INSERT INTO categories (name) values (?)', ['Outras despesas']],
          ])
            .then(() => console.log('default categories added'))
            .catch(e => console.log('error on create default categories', JSON.stringify(e)));
        }
      }).
      catch(e => console.log('error on get categories quantity', JSON.stringify(e)));
  }

  private dropTables() {
    this.dbConnection.sqlBatch([
      ['DROP TABLE categories']
      ['DROP TABLE entries'],
    ])
      .then(() => console.log('tables dropped successfully'))
      .catch(e => console.log('error on drop tables', JSON.stringify(e)));
  }
}
