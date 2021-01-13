import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./patent/patent.module').then(mod => mod.PatentModule),
  },
  // {
  //   path: 'publication',
  //   loadChildren: () => import('./publication/publication.module').then(mod => mod.PublicationModule),
  // },
  // {
  //   path: 'comparison',
  //   loadChildren: () => import('./comparison/comparison.module').then(mod => mod.ComparisonModule),
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
