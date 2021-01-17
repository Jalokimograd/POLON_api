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
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PublicationBrowserListComponent } from './comparison-browser/widgets/comparison-overview/publication-browser-list/publication-browser-list.component';
import { PublicationTop10CreatorsComponent } from './comparison-browser/widgets/comparison-creators/publication-top10-creators/publication-top10-creators.component';
import { PatentGraphComponent } from './comparison-browser/widgets/comparison-graph/patent-graph/patent-graph.component';
import { PublicationGraphComponent } from './comparison-browser/widgets/comparison-graph/publication-graph/publication-graph.component';
import { PublicationTop10UnitsComponent } from './comparison-browser/widgets/comparison-units/publication-top10-units/publication-top10-units.component';


@NgModule({
  declarations: [ComparisonBrowserComponent, BrowserFilterComponent, PatentBrowserListComponent, PatentTop10CreatorsComponent, PatentTop10UnitsComponent, ComparisonOverviewComponent, ComparisonCreatorsComponent, ComparisonUnitsComponent, NestedComponentsComponent, HorizontalBarComponent, ComparisonGraphComponent, GraphWrapperComponent, PublicationBrowserListComponent, PublicationTop10CreatorsComponent, PatentGraphComponent, PublicationGraphComponent, PublicationTop10UnitsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComparisonRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxGraphModule,
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
