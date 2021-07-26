import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AccountService } from './../../services/account/account.service';
import { CategoryDAOService } from 'src/app/services/category-dao/category-dao.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  categories: [];
  entryForm: FormGroup;

  entry = {
    amount: 0.00,
    categoryId: '',
  };

  constructor(
    private navCtrl: NavController,
    public builder: FormBuilder,
    public accountService: AccountService,
    public categoryDAO: CategoryDAOService,
  ) {
    this.entryForm = builder.group({
      amount: new FormControl('', Validators.compose([Validators.required])),
      categoryId: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
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
    this.accountService.
    addEntry(this.entry.amount, this.entry.categoryId)
      .then(() => {
        console.log('registro inserido');
      });
  }

  loadData() {
    this.categoryDAO
      .getAll()
        .then((dado: any) => this.categories = dado);
  }
}
