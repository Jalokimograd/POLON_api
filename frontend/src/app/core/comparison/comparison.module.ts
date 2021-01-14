import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonBrowserComponent } from './comparison-browser/comparison-browser.component';
import { BrowserFilterComponent } from './comparison-browser/browser-filter/browser-filter.component';
import { PatentBrowserListComponent } from './comparison-browser/widgets/comparison-overview/patent-browser-list/patent-browser-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ComparisonRoutingModule } from './comparison-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PatentBrowserDataService } from './comparison-browser/patent-browser-data.service';
import { PatentTop10CreatorsComponent } from './comparison-browser/widgets/comparison-creators/patent-top10-creators/patent-top10-creators.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatentTop10UnitsComponent } from './comparison-browser/widgets/comparison-units/patent-top10-units/patent-top10-units.component';
import { ComparisonOverviewComponent } from './comparison-browser/widgets/comparison-overview/comparison-overview.component';
import { ComparisonCreatorsComponent } from './comparison-browser/widgets/comparison-creators/comparison-creators.component';
import { ComparisonUnitsComponent } from './comparison-browser/widgets/comparison-units/comparison-units.component';
import { NestedComponentsComponent } from './comparison-browser/shared/nested-components/nested-components.component';
import { HorizontalBarComponent } from './comparison-browser/shared/horizontal-bar/horizontal-bar.component';
import { ComparisonGraphComponent } from './comparison-browser/widgets/comparison-graph/comparison-graph.component';
import { GraphWrapperComponent } from './comparison-browser/widgets/comparison-graph/graph-wrapper/graph-wrapper.component';


@NgModule({
  declarations: [ComparisonBrowserComponent, BrowserFilterComponent, PatentBrowserListComponent, PatentTop10CreatorsComponent, PatentTop10UnitsComponent, ComparisonOverviewComponent, ComparisonCreatorsComponent, ComparisonUnitsComponent, NestedComponentsComponent, HorizontalBarComponent, ComparisonGraphComponent, GraphWrapperComponent],
    imports: [
        CommonModule,
        SharedModule,
        ComparisonRoutingModule,
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
export class ComparisonModule {
}
