import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NameValue } from '../../../shared/horizontal-bar/horizontal-bar.component';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { map } from 'rxjs/operators';
import { PublicationBrowserDataService } from '../../../publication-browser-data.service';

@Component({
  selector: 'app-publication-top10-creators',
  templateUrl: './publication-top10-creators.component.html',
  styleUrls: ['./publication-top10-creators.component.scss']
})
export class PublicationTop10CreatorsComponent implements OnInit {

  chartData$: Observable<NameValue[]>;

  constructor(public data: PublicationBrowserDataService) {
    this.chartData$ = this.top10Creators();
  }

  ngOnInit(): void {
  }

  top10Creators(): Observable<NameValue[]> {
    return this.data.tableDataSubject.pipe(
      map(x => x.flatMap(e => e.authors)),
      map(x => {
        return x.reduce(
          (entryMap, e) => entryMap.set(`${e.firstName} ${e.lastName}`, [...entryMap.get(`${e.firstName} ${e.lastName}`) || [], e]),
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
