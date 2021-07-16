import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewEntryPageRoutingModule } from './new-entry-routing.module';
import { NewEntryPage } from './new-entry.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewEntryPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NewEntryPage]
})
export class NewEntryPageModule { }
