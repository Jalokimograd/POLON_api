import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserFilter } from '../model/dto/browser.filter';
import { PatentDto } from '../model/dto/patent/patent.dto';
import { BrowserFilterDTO } from '../model/dto/browser.dto.filter';
import { PublicationDto } from '../model/dto/publication/publication.dto';
import { PublicationResultDto } from '../model/dto/publication/publication-result.dto';
import { GraphDto } from '../model/dto/graph/graph.dto';

@Injectable({
  providedIn: 'root'
})
export class PublicationBrowserHttpService {
  constructor(private http: HttpClient) {
  }
  public fetchAll(filter: BrowserFilter): Observable<PublicationResultDto> {
    const filterDto = this.mapFilterToDTO(filter);
    Object.keys(filterDto).forEach(key => filterDto[key] === undefined ? delete filterDto[key] : {});

    return this
      .http
      .get<PublicationResultDto>('/api/publication/all', {params: filterDto as any});
  }
  public fetchAllGraph(filter: BrowserFilter): Observable<GraphDto> {
    const filterDto = this.mapFilterToDTO(filter);
    Object.keys(filterDto).forEach(key => filterDto[key] === undefined ? delete filterDto[key] : {});

    return this
      .http
      .get<GraphDto>('/api/publication/graph/all', {params: filterDto as any});
  }

  private mapFilterToDTO(filter: BrowserFilter): BrowserFilterDTO {
    return {
      from: filter.from?.toISOString(false),
      to: filter.to?.toISOString(false),
      institutionsId: filter?.institutions.map(e => e.id),
      authorNames: filter?.authorNames
    } as BrowserFilterDTO;
  }
}
