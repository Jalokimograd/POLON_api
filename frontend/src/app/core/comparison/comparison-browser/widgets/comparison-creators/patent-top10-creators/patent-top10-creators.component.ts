import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameValue } from '../../../shared/horizontal-bar/horizontal-bar.component';

@Component({
  selector: 'app-patent-top10-creators',
  templateUrl: './patent-top10-creators.component.html',
  styleUrls: ['./patent-top10-creators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatentTop10CreatorsComponent implements OnInit {
  chartData$: Observable<NameValue[]>;

  constructor(public data: PatentBrowserDataService) {
    this.chartData$ = this.top10Creators();
  }

  ngOnInit(): void {
  }

  top10Creators(): Observable<NameValue[]> {
    return this.data.tableDataSubject.pipe(
      map(x => x.flatMap(e => e.creators)),
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
