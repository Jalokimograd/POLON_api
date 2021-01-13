import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PatentBrowserFilter } from '../../../../shared/model/dto/patent-browser.filter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FromToValidator } from '../../../../shared/validator/from-to.validator';
import { UnitDto } from '../../../../shared/model/dto/unit.dto';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-patent-browser-filter',
  templateUrl: './patent-browser-filter.component.html',
  styleUrls: ['./patent-browser-filter.component.scss']
})
export class PatentBrowserFilterComponent implements OnInit {

  @Output() public clearClick = new EventEmitter<any>();
  @Output() public filterChange = new EventEmitter<PatentBrowserFilter>();
  public filtersForm: FormGroup;
  public selectedUnits: UnitDto[] = [];
  unitCtrl = new FormControl();
  allUnits: UnitDto[] = [{id: 1, name: 'Politechnika Warszawska'} as UnitDto, {id: 2, name: 'Uniwersytet Gdański'}];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUnits: Observable<UnitDto[]>;

  @ViewChild('unitInput') unitInput: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    this.filteredUnits = this.unitCtrl.valueChanges.pipe(
      filter(v => typeof v === 'string'),
      map((unit: string | null) => unit ? this._filter(unit) : this.allUnits));
  }


  ngOnInit(): void {
    this.initFormData();
  }

  onSearchClick(): void {
    this.filterChange.emit(
      {
        ...this.filtersForm.value
      } as PatentBrowserFilter
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

  removeUnit(unit: UnitDto): void {
    const index = this.selectedUnits.indexOf(unit);

    if (index >= 0) {
      this.selectedUnits.splice(index, 1);
    }
  }

  private _filter(value: string): UnitDto[] {
    const filterValue = value.toLowerCase();

    return this.allUnits.filter(unit => unit.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
