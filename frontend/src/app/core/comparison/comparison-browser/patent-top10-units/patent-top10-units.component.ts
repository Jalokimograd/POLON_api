import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatentBrowserDataService } from '../patent-browser-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patent-top10-units',
  templateUrl: './patent-top10-units.component.html',
  styleUrls: ['./patent-top10-units.component.scss']
})
export class PatentTop10UnitsComponent implements OnInit {
  chartData$: Observable<NameValue[]>;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  yAxisLabel = 'Jednostka';
  showYAxisLabel = true;
  xAxisLabel = 'Wystąpień';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public data: PatentBrowserDataService) {
    this.chartData$ = this.top10Units();
  }

  ngOnInit(): void {
  }

  top10Units(): Observable<NameValue[]> {
    return this.data.tableDataSubject.pipe(
      map(x => x.flatMap(e => e.units)),
      map(x => {
        return x.reduce(
          (entryMap, e) => entryMap.set(e.name, [...entryMap.get(e.name) || [], e]),
          new Map()
        );
      }),
      map((e) => {
        const result = [];
        for (const [key, value] of e) {
          result.push({
            name: key,
            value: value.length
          } as NameValue);
        }
        return result;
      }),
      map(e => e.sort((a, b) => b.value - a.value)),
      // map(e => e.slice(0, 10))
    );
  }

  formatInteger(val): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}

interface NameValue {
  name: string;
  value: number;
}
