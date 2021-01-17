import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatentBrowserDataService } from '../../../patent-browser-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { PatentDto } from '../../../../../../shared/model/dto/patent/patent.dto';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-patent-browser-list',
  templateUrl: './patent-browser-list.component.html',
  styleUrls: ['./patent-browser-list.component.scss']
})
export class PatentBrowserListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['date', 'title', 'type', 'creators', 'units'];
  public tableDataSource = new MatTableDataSource<PatentDto>();

  constructor(public data: PatentBrowserDataService) {
    data
      .tableDataSubject
      .subscribe(e => this.tableDataSource.data = e);
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
