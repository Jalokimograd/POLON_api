import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../bootstrap/header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    HeaderComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => {
        switch (navigator.language) {
          case 'pl-PL':
            return navigator.language;
          default:
            return 'en-GB';
        }
      },
    }
  ]
})
export class CoreModule {
}
