import { Component, OnInit } from '@angular/core';
import { PatentBrowserHttpService } from '../../../shared/service/patent-browser-http.service';
import { PatentBrowserFilter } from '../../../shared/model/dto/patent-browser.filter';
import { PatentBrowserDataService } from './patent-browser-data.service';
import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-patent-browser',
  templateUrl: './patent-browser.component.html',
  styleUrls: ['./patent-browser.component.scss'],
  providers: [PatentBrowserHttpService]
})
export class PatentBrowserComponent implements OnInit {

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
