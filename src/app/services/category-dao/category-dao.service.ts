import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDAOService {

  constructor(public database: DatabaseService) { }

  getAll() {
    // eslint-disable-next-line max-len
    // const sql = 'SELECT e.*, c.id AS category_id, c.name AS category_name, c.color AS category_color FROM entries e INNER JOIN categories c ON (e.category_id = c.id) WHERE e.id = ?';
    const sql = 'SELECT * FROM categories ORDER BY name';
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
}
