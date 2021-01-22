import { Component, OnInit } from '@angular/core';
import { PatentBrowserDataService } from '../../patent-browser-data.service';
import { PublicationBrowserDataService } from '../../publication-browser-data.service';

@Component({
  selector: 'app-comparison-overview',
  templateUrl: './comparison-overview.component.html',
  styleUrls: ['./comparison-overview.component.scss']
})
export class ComparisonOverviewComponent implements OnInit {

  constructor(public patentData: PatentBrowserDataService, public pubsData: PublicationBrowserDataService) { }

  ngOnInit(): void {
  }

}
