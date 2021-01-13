import { Component, OnInit } from '@angular/core';
import { PatentBrowserHttpService } from '../../../shared/service/patent-browser-http.service';
import { PatentBrowserFilter } from '../../../shared/model/dto/patent-browser.filter';
import { PatentBrowserDataService } from './patent-browser-data.service';

@Component({
  selector: 'app-comparison-browser',
  templateUrl: './comparison-browser.component.html',
  styleUrls: ['./comparison-browser.component.scss'],
  providers: [PatentBrowserHttpService]
})
export class ComparisonBrowserComponent implements OnInit {

  constructor(private data: PatentBrowserDataService) {
  }

  ngOnInit(): void {
  }

  onFilterChange($event: PatentBrowserFilter): void {
    this.data.applyFilter($event);
  }

  onClearFilter(): void {
    // this.availableDesks.clearData();
  }
}
