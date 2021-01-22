import { Component, OnInit } from '@angular/core';
import { PublicationBrowserDataService } from '../../../publication-browser-data.service';

@Component({
  selector: 'app-publication-graph',
  templateUrl: './publication-graph.component.html',
  styleUrls: ['./publication-graph.component.scss']
})
export class PublicationGraphComponent implements OnInit {

  constructor(public data: PublicationBrowserDataService) { }

  ngOnInit(): void {
  }

}
