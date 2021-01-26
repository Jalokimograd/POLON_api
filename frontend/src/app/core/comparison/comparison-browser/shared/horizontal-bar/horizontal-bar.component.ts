import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalBarComponent implements OnInit, OnChanges{

  // options
  view = null;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  @Input() yAxisLabel = 'Twórca';
  showYAxisLabel = true;
  @Input() xAxisLabel = 'Wystąpień';
  @Input() data: NameValue[];

  @ViewChild('chartArea', { static: false })
  chartArea: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.setViewSize();
  }

  setViewSize(): void {
    this.view = this.data.length > 15 ?
      [Math.max(this.data.length * 12 + 140, this.chartArea?.nativeElement?.offsetWidth || 700 + 70), 850] : null;
  }
  formatInteger(val): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  ngOnChanges(): void {
    this.setViewSize();
  }
}

export interface NameValue {
  name: string;
  value: number;
}
