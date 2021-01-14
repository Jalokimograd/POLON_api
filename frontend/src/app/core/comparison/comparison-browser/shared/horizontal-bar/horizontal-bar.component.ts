import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  @Input() yAxisLabel = 'Twórca';
  showYAxisLabel = true;
  @Input() xAxisLabel = 'Wystąpień';
  @Input() data: NameValue[];

  constructor() { }

  ngOnInit(): void {
  }

  formatInteger(val): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}

export interface NameValue {
  name: string;
  value: number;
}
