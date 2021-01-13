import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PatentBrowserDataService } from '../patent-browser-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patent-top10-creators',
  templateUrl: './patent-top10-creators.component.html',
  styleUrls: ['./patent-top10-creators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatentTop10CreatorsComponent implements OnInit {
  chartData$: Observable<NameValue[]>;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  @Input() yAxisLabel = 'Twórca';
  showYAxisLabel = true;
  @Input() xAxisLabel = 'Wystąpień';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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
    // return this.data.tableDataSubject.pipe(
    //   mergeMap(x => x.map(e => e.creators)),
    //   mergeMap(x => x.map(e => e)),
    //   groupBy(x => x.name),
    //   tap(e => console.log(e)),
    //
    //   mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], []))),
    //   // mergeMap(group$ =>
    //   //   group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
    //   // ),
    //   tap(e => console.log(e)),
    //
    //   map(arr => ({name: arr[0], values: arr.slice(1)} as NameValues)),
    //   tap(e => console.log(e))
    // );
  }

  // chartData(): Observable<NameValue[]> {
  //   return this.top10Creators().pipe(
  //     map(e => {
  //       return {name: e.name, value: e.values.length} as NameValue;
  //     }),
  //     toArray(),
  //     tap(e => console.log(e))
  //   );
  // }

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

