import { CategoryDAOService } from './../category-dao/category-dao.service';
import { Injectable } from '@angular/core';
import { EntryDAOService } from '../entry-dao/entry-dao.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private balance = 0;

  constructor(
    public entryDao: EntryDAOService,
    public categoryDao: CategoryDAOService
  ) {
    this.loadBalance();
   }

  addEntry(amount, categoryId){
    this.balance += Number(amount);

    return this.entryDao.insert(amount, categoryId)
    .then(() => console.log('new entry added'));
  }

  currentBalance() {
    return this.balance;
  }

  allEntries() {
    return this.entryDao.getAll();
  }

  private loadBalance() {
    this.entryDao.getBalance()
    .then((balance: any) => this.balance = Number(balance));
  }
}
