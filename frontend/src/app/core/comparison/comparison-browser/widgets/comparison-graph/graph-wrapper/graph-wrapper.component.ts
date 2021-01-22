import { Component, Input, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { GraphNodeDto } from '../../../../../../shared/model/dto/graph/graph-node.dto';
import { GraphLinkDto } from '../../../../../../shared/model/dto/graph/graph-link.dto';

@Component({
  selector: 'app-graph-wrapper',
  templateUrl: './graph-wrapper.component.html',
  styleUrls: ['./graph-wrapper.component.scss']
})
export class GraphWrapperComponent implements OnInit {

  curve = shape.curveBundle.beta(1);
  @Input() public nodes: GraphNodeDto[];
  @Input() public links: GraphLinkDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
