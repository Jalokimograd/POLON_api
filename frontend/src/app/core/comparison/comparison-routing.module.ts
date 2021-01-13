import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ComparisonBrowserComponent } from './comparison-browser/comparison-browser.component';

const routes: Routes = [
  {
    path: '',
    component: ComparisonBrowserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComparisonRoutingModule {

}
