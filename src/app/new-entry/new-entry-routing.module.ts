import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEntryPage } from './new-entry.page';

const routes: Routes = [
  {
    path: '',
    component: NewEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEntryPageRoutingModule {}
