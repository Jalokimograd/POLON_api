import { Injectable } from '@angular/core';
import { PatentBrowserHttpService } from '../../../shared/service/patent-browser-http.service';
import { BrowserFilter } from '../../../shared/model/dto/browser.filter';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PatentResultDto } from '../../../shared/model/dto/patent/patent-result.dto';
import { NetworkPropDto } from '../../../shared/model/dto/network-prop.dto';
import { GraphDto } from '../../../shared/model/dto/graph/graph.dto';

@Injectable({
  providedIn: 'root'
})
export class PatentBrowserDataService {
  public tableDataSubject = new BehaviorSubject<PatentResultDto>({
    patents: []
  } as PatentResultDto);

  public graphData = new BehaviorSubject<GraphDto>({
    links: [], nodes: [], networkProp: {
      avgPathLength: 0.0,
      avgDensity: 0.0,
      avgVertexGrade: 0.0,
      globalGrape: 0.0,
      grape: 0.0
    } as NetworkPropDto
  } as GraphDto);

  private lastLoadedFilter: BrowserFilter;

  constructor(private http: PatentBrowserHttpService) {
  }

  public applyFilter(filter: BrowserFilter): void {
    this.http
      .fetchAll(filter)
      .pipe(tap(_ => this.lastLoadedFilter = filter))
      .subscribe(e => this.tableDataSubject.next(e));

    this.http
      .fetchAllGraph(filter)
      .subscribe(e => this.graphData.next(e));
  }
}
