import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BrowserFilter } from '../model/dto/browser.filter';
import { PatentDto } from '../model/dto/patent/patent.dto';
import { PatentAuthorDto } from '../model/dto/patent/patent-author.dto';
import { InstitutionDto } from '../model/dto/institution.dto';
import { BrowserFilterDTO } from '../model/dto/browser.dto.filter';
import { PatentResultDto } from '../model/dto/patent/patent-result.dto';
import { GraphDto } from '../model/dto/graph/graph.dto';

@Injectable({
  providedIn: 'root'
})
export class PatentBrowserHttpService {
  constructor(private http: HttpClient) {
  }
  public fetchAllInstitutes(): Observable<InstitutionDto[]>{
    return this
      .http
      .get<InstitutionDto[]>('/api/patent/institutes');
  }
  public fetchAllGraph(filter: BrowserFilter): Observable<GraphDto> {
    const filterDto = this.mapFilterToDTO(filter);
    Object.keys(filterDto).forEach(key => filterDto[key] === undefined ? delete filterDto[key] : {});

    return this
      .http
      .get<GraphDto>('/api/patent/graph/all', {params: filterDto as any});
  }
  public fetchAll(filter: BrowserFilter): Observable<PatentResultDto> {
    const filterDto = this.mapFilterToDTO(filter);
    Object.keys(filterDto).forEach(key => filterDto[key] === undefined ? delete filterDto[key] : {});

    return this
      .http
      .get<PatentResultDto>('/api/patent/all', {params: filterDto as any});
    /*    return of([
          {
            id: 1,
            country: 'Polska',
            date: new Date(),
            creators: [
              {
                id: 1,
                name: 'Jan Kowalski'
              } as PatentCreatorDto,
              {
                id: 2,
                name: 'Anna Nowak',
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'Jan Kowalski'
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'A'
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'A'
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'A'
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'A'
              } as PatentCreatorDto,
              {
                id: 5,
                name: 'B'
              } as PatentCreatorDto,
              {
                id: 3,
                name: 'C'
              } as PatentCreatorDto
            ],
            number: '213121',
            productName: 'Sposób zwiększania ciężaru cząsteczkowego poli(węglanu trimetylenu)',
            type: 'Wynalazek',
            units: [{
              id: 1,
              name: 'Politechnika Warszawska'
            } as InstitutionDto,
              {
                id: 2,
                name: 'Uniwersytet Warszawski',
              } as InstitutionDto,
            ]
          } as PatentDto
        ]);*/
  }

  private mapFilterToDTO(filter: BrowserFilter): BrowserFilterDTO {
    return {
      from: filter.from?.toISOString(false),
      to: filter.to?.toISOString(false),
      institutions: filter?.institutions
    } as BrowserFilterDTO;
  }
}
