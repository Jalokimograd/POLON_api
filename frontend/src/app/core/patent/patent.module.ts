import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatentBrowserComponent } from './patent-browser/patent-browser.component';
import { PatentBrowserFilterComponent } from './patent-browser/patent-browser-filter/patent-browser-filter.component';
import { PatentBrowserListComponent } from './patent-browser/patent-browser-list/patent-browser-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PatentRoutingModule } from './patent-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PatentBrowserDataService } from './patent-browser/patent-browser-data.service';
import { PatentTop10CreatorsComponent } from './patent-browser/patent-top10-creators/patent-top10-creators.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatentTop10UnitsComponent } from './patent-browser/patent-top10-units/patent-top10-units.component';


@NgModule({
  declarations: [PatentBrowserComponent, PatentBrowserFilterComponent, PatentBrowserListComponent, PatentTop10CreatorsComponent, PatentTop10UnitsComponent],
    imports: [
        CommonModule,
        SharedModule,
        PatentRoutingModule,
        ReactiveFormsModule,
        NgxChartsModule,
    ],
  exports: [
    RouterModule
  ],
  providers: [
    PatentBrowserDataService
  ]
})
export class PatentModule {
}
