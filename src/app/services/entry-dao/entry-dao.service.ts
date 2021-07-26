import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class EntryDAOService {

  constructor(public database: DatabaseService) { }

  insert(amount, categoryId) {
    const sql = 'INSERT INTO entries (amount, entry_at , category_id) VALUES (?, ?, ?)';
    const data = [amount.amount, 1, categoryId];

    return this.database.db.executeSql(sql, data)
      .catch((err) => console.log('erro ao inserir na tabela', JSON.stringify(err)));
  }

  update(entry, id) {
    // const sql = 'UPDATE entries set amount = ?, description = ?, entry_at = ?, is_init = ?, category_id = ? WHERE id = ?';
    const sql = 'UPDATE entries set amount = ?, entry_at = ?, category_id = ? WHERE id = ?';
    const data = [entry.amount, 1, entry.categoryId, id];

    return this.database.db.executeSql(sql, data)
      .catch((err) => console.log('error on update', JSON.stringify(err)));
  }

  delete(id) {
    const sql = 'DELETE FROM entries WHERE id = ?';
    const data = [id];

    return this.database.db.executeSql(sql, data)
      .catch((err) => console.log('error on delete', JSON.stringify(err)));
  }

  deleteAll() {
    const sql = 'DELETE FROM entries';
    const data = [];

    return this.database.db.executeSql(sql, data)
      .catch((err) => console.log('error on delete All', JSON.stringify(err)));
  }

  get(id: number) {
    // eslint-disable-next-line max-len
    // const sql = 'SELECT e.*, c.id AS category_id, c.name AS category_name, c.color AS category_color FROM entries e INNER JOIN categories c ON (e.category_id = c.id) WHERE e.id = ?';
    const sql = 'SELECT * FROM entries WHERE id = ?';
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .then((dados: any) => {
        if (dados.rows.lenght > 0) {
          return dados.rows.item(0);
          // const entry = new Entry({
          //   id: item.id,
          //   amount: item.amount,
          //   description: item.description,
          //   entryAt: item.entryAt,
          //   isInit: item.isInit,
          //   category: new Category({ id: item.category_id, name: item.category_name, color: item.category_color })
          // });
          // return entry;
        }
        return null;
      })
      .catch((err) => console.log('error on get', JSON.stringify(err)));
  }

  getAll() {
    // eslint-disable-next-line max-len
    // const sql = 'SELECT e.*, c.id AS category_id, c.name AS category_name, c.color AS category_color FROM entries e INNER JOIN categories c ON (e.category_id = c.id) WHERE e.id = ?';
    const sql = 'SELECT * FROM entries ORDER BY entryAt';
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((dados: any) => {
        if (dados.rows.lenght > 0) {
          const entries: any[] = [];

          for (let i = 0; i < dados.rows.length; i++) {
            const item = dados.rows.item(i);
            entries.push(item);
          }

          return entries.push;
        }
        return null;
      })
      .catch((err) => console.log('error on get', JSON.stringify(err)));
  }

  getBalance() {
    const sql = 'SELECT SUM(amount) as balance FROM entries';
    const data = [];

    return this.database.db.executeSql(sql, data)
            .then((dado: any) => {
              if (dado.rows.length > 0) {
                const item = dado.rows.item(0);
                return item.balance;
              }
              return null;
            })
            .catch((err) => console.log('error on getBalance', JSON.stringify(err)));
  }
}
