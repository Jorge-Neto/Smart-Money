import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEntryPageRoutingModule } from './new-entry-routing.module';

import { NewEntryPage } from './new-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEntryPageRoutingModule
  ],
  declarations: [NewEntryPage]
})
export class NewEntryPageModule {}
