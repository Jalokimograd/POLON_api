import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./comparison/comparison.module').then(mod => mod.ComparisonModule),
  },
  // {
  //   path: 'publication',
  //   loadChildren: () => import('./publication/publication.module').then(mod => mod.PublicationModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
