import { Injectable } from '@angular/core';
import { BrowserFilter } from '../../../shared/model/dto/browser.filter';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PublicationDto } from '../../../shared/model/dto/publication/publication.dto';
import { PublicationBrowserHttpService } from '../../../shared/service/publication-browser-http.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationBrowserDataService {
  public tableDataSubject = new BehaviorSubject<PublicationDto[]>([]);
  private lastLoadedFilter: BrowserFilter;

  constructor(private http: PublicationBrowserHttpService) {
  }

  public applyFilter(filter: BrowserFilter): void {
    this.http
      .fetchAll(filter)
      .pipe(tap(_ => this.lastLoadedFilter = filter))
      .subscribe(e => this.tableDataSubject.next(e));
  }
}
