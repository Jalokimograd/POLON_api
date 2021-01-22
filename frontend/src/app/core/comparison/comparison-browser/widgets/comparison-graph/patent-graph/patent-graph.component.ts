import { Component, OnInit } from '@angular/core';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';

@Component({
  selector: 'app-patent-graph',
  templateUrl: './patent-graph.component.html',
  styleUrls: ['./patent-graph.component.scss']
})
export class PatentGraphComponent implements OnInit {

  constructor(public data: PatentBrowserDataService) {
  }


  ngOnInit(): void {
  }

}
