import { Injectable } from '@angular/core';
import { BrowserFilter } from '../../../shared/model/dto/browser.filter';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PublicationDto } from '../../../shared/model/dto/publication/publication.dto';
import { PublicationBrowserHttpService } from '../../../shared/service/publication-browser-http.service';
import { PublicationResultDto } from '../../../shared/model/dto/publication/publication-result.dto';
import { NetworkPropDto } from '../../../shared/model/dto/network-prop.dto';
import { GraphDto } from '../../../shared/model/dto/graph/graph.dto';

@Injectable({
  providedIn: 'root'
})
export class PublicationBrowserDataService {
  public tableDataSubject = new BehaviorSubject<PublicationResultDto>({
    publications: []
  } as PublicationResultDto);
  public graphData = new BehaviorSubject<GraphDto>({
    links: [], nodes: [], networkProp: {
      avgClustering: 0.0,
      avgDensity: 0.0,
      avgVertexGrade: 0.0,
      grape: 0.0
    } as NetworkPropDto
  } as GraphDto);
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
