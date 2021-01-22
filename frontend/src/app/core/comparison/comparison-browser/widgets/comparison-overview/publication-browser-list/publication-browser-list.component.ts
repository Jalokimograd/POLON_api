import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatentDto } from '../../../../../../shared/model/dto/patent/patent.dto';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { PublicationDto } from '../../../../../../shared/model/dto/publication/publication.dto';
import { PublicationBrowserDataService } from '../../../publication-browser-data.service';

@Component({
  selector: 'app-publication-browser-list',
  templateUrl: './publication-browser-list.component.html',
  styleUrls: ['./publication-browser-list.component.scss']
})
export class PublicationBrowserListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['date', 'title', 'type', 'creators'];
  public tableDataSource = new MatTableDataSource<PublicationDto>();

  constructor(public data: PublicationBrowserDataService) {
    data
      .tableDataSubject
      .subscribe(e => this.tableDataSource.data = e.publications);
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default:
          return item[property];
      }
    };
  }
}
