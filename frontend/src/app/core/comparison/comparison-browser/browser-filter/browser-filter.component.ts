import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BrowserFilter } from '../../../../shared/model/dto/browser.filter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FromToValidator } from '../../../../shared/validator/from-to.validator';
import { InstitutionDto } from '../../../../shared/model/dto/institution.dto';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map } from 'rxjs/operators';
import { PatentBrowserHttpService } from '../../../../shared/service/patent-browser-http.service';

@Component({
  selector: 'app-browser-filter',
  templateUrl: './browser-filter.component.html',
  styleUrls: ['./browser-filter.component.scss']
})
export class BrowserFilterComponent implements OnInit {

  @Output() public clearClick = new EventEmitter<any>();
  @Output() public filterChange = new EventEmitter<BrowserFilter>();
  public filtersForm: FormGroup;
  public selectedUnits: InstitutionDto[] = [];
  unitCtrl = new FormControl();
  allInstitutes: InstitutionDto[] = [{id: '1', name: 'Politechnika Warszawska'} as InstitutionDto, {
    id: '2',
    name: 'Uniwersytet Gdański'
  }];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUnits: Observable<InstitutionDto[]>;

  @ViewChild('unitInput') unitInput: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private http: PatentBrowserHttpService) {
    this.filteredUnits = this.unitCtrl.valueChanges.pipe(
      filter(v => typeof v === 'string'),
      map((unit: string | null) => unit ? this._filter(unit) : this.allInstitutes));
  }


  ngOnInit(): void {
    this.initFormData();
    this.loadInstitutes();
  }

  onSearchClick(): void {
    this.filterChange.emit(
      {
        ...this.filtersForm.value
      } as BrowserFilter
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUnits.push(event.option.value);
    this.unitInput.nativeElement.value = '';
    this.unitCtrl.setValue(null);
  }

  public resetForm(): void {
    this.filtersForm.reset();
    // this.locationComponent.resetFilter();
    this.clearClick.emit(true);
  }

  private initFormData(): void {
    this.filtersForm = this.fb.group({
      from: this.fb.control(undefined),
      to: this.fb.control(undefined),
    }, {
      validators: [
        FromToValidator,
      ]
    });
  }

  removeUnit(unit: InstitutionDto): void {
    const index = this.selectedUnits.indexOf(unit);

    if (index >= 0) {
      this.selectedUnits.splice(index, 1);
    }
  }

  private _filter(value: string): InstitutionDto[] {
    const filterValue = value.toLowerCase();

    return this.allInstitutes.filter(unit => unit.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private loadInstitutes(): void {
    this.http.fetchAllInstitutes().subscribe(e => this.allInstitutes = e);
  }
}
