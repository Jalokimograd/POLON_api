import { Component, OnInit } from '@angular/core';
import { PatentBrowserHttpService } from '../../../shared/service/patent-browser-http.service';
import { BrowserFilter } from '../../../shared/model/dto/browser.filter';
import { PatentBrowserDataService } from './patent-browser-data.service';
import { PublicationBrowserDataService } from './publication-browser-data.service';

@Component({
  selector: 'app-comparison-browser',
  templateUrl: './comparison-browser.component.html',
  styleUrls: ['./comparison-browser.component.scss'],
  providers: [PatentBrowserHttpService]
})
export class ComparisonBrowserComponent implements OnInit {

  constructor(private patentData: PatentBrowserDataService, private publicationData: PublicationBrowserDataService) {
  }

  ngOnInit(): void {
  }

  onFilterChange($event: BrowserFilter): void {
    this.patentData.applyFilter($event);
    this.publicationData.applyFilter($event);
  }

  onClearFilter(): void {
    // this.availableDesks.clearData();
  }
}
