import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PatentBrowserFilter } from '../model/dto/patent-browser.filter';
import { PatentDto } from '../model/dto/patent/patent.dto';
import { PatentCreatorDto } from '../model/dto/patent/patent-creator.dto';
import { UnitDto } from '../model/dto/unit.dto';

@Injectable({
  providedIn: 'root'
})
export class PatentBrowserHttpService {
  constructor(private http: HttpClient) {
  }

  public fetchAll(filter: PatentBrowserFilter): Observable<PatentDto[]> {
    return of([
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
        } as UnitDto,
          {
            id: 2,
            name: 'Uniwersytet Warszawski',
          } as UnitDto,
        ]
      } as PatentDto
    ]);
  }
}
