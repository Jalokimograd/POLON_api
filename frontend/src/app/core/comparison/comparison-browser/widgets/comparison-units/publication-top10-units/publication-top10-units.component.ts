import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NameValue } from '../../../shared/horizontal-bar/horizontal-bar.component';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-publication-top10-units',
  templateUrl: './publication-top10-units.component.html',
  styleUrls: ['./publication-top10-units.component.scss']
})
export class PublicationTop10UnitsComponent implements OnInit {
  chartData$: Observable<NameValue[]>;

  constructor(public data: PatentBrowserDataService) {
    this.chartData$ = this.top10Units();
  }

  ngOnInit(): void {
  }

  top10Units(): Observable<NameValue[]> {
    return this.data.tableDataSubject.pipe(
      map(x => x.patents),
      map(x => x.flatMap(e => e.institutes)),
      map(x => {
        return x.reduce(
          (entryMap, e) => entryMap.set(e.title, [...entryMap.get(e.title) || [], e]),
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
