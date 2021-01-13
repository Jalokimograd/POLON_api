import { Injectable } from '@angular/core';
import { PatentDto } from '../../../shared/model/dto/patent/patent.dto';
import { PatentBrowserHttpService } from '../../../shared/service/patent-browser-http.service';
import { PatentBrowserFilter } from '../../../shared/model/dto/patent-browser.filter';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatentBrowserDataService {
  public tableDataSubject = new BehaviorSubject<PatentDto[]>([]);
  private lastLoadedFilter: PatentBrowserFilter;

  constructor(private http: PatentBrowserHttpService) {
  }

  public applyFilter(filter: PatentBrowserFilter): void {
    this.http
      .fetchAll(filter)
      .pipe(tap(_ => this.lastLoadedFilter = filter))
      .subscribe(e => this.tableDataSubject.next(e));
  }
}
