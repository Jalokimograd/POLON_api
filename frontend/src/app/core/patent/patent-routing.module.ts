import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { PatentBrowserComponent } from './patent-browser/patent-browser.component';

const routes: Routes = [
  {
    path: '',
    component: PatentBrowserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatentRoutingModule {

}
