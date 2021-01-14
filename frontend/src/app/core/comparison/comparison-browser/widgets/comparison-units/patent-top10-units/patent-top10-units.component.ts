import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { map } from 'rxjs/operators';
import { NameValue } from '../../../shared/horizontal-bar/horizontal-bar.component';

@Component({
  selector: 'app-patent-top10-units',
  templateUrl: './patent-top10-units.component.html',
  styleUrls: ['./patent-top10-units.component.scss']
})
export class PatentTop10UnitsComponent implements OnInit {
  chartData$: Observable<NameValue[]>;

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
}
