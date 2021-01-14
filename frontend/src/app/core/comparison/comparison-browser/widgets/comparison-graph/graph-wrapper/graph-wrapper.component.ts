import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graph-wrapper',
  templateUrl: './graph-wrapper.component.html',
  styleUrls: ['./graph-wrapper.component.scss']
})
export class GraphWrapperComponent implements OnInit {

  curve = shape.curveBundle.beta(1);

  constructor() { }

  ngOnInit(): void {
  }

}
