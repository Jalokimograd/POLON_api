import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterHideService } from '../../shared/filter-hide.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public filterHide: FilterHideService) { }

  ngOnInit(): void {
  }

}
