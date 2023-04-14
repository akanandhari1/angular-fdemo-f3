import {
  ElementRef,
  HostBinding,
  Component,
  OnInit,
  ViewChild,
  forwardRef,
  Input,
  Optional,
  Self,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NgControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
//import { MatFormFieldControl } from '@angular/material';
export class ItemList {
  constructor(public item: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'app-multiselect-auto-complete',
  templateUrl: './multiselect-auto-complete.component.html',
  styleUrls: ['./multiselect-auto-complete.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: MultiselectAutoCompleteComponent,
    },
  ],
})
export class MultiselectAutoCompleteComponent
  implements ControlValueAccessor, MatFormFieldControl<ItemList>
{
  @ViewChild('inputTrigger', { read: MatAutocompleteTrigger })
  inputTrigger: MatAutocompleteTrigger;
  itemControl = new FormControl();
  stateChanges = new Subject<void>();
  private _placeholder: string;
  static nextId = 0;
  @HostBinding() id = `input-ac-${MultiselectAutoCompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }
  @Input() set value(value: any) {
    if (value) {
      this.selectedItems = value;
    }
    this.stateChanges.next();
  }
  get value() {
    return this.selectedItems;
  }
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private changeCallback: Function;
  private touchedCallback: Function;
  focused = false;
  isAllSelected = false;
  remove(fruit: ItemList): void {
    const index = this.selectedItems.indexOf(fruit);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }
  items = [
    new ItemList('Misha Arnold'),
    new ItemList('Felix Godines'),
    new ItemList('Odessa Thorton'),
    new ItemList('Julianne Gills'),
    new ItemList('Virgil Hommel'),
    new ItemList('Justa Betts'),
    new ItemList('Keely Millington'),
    new ItemList('Blanca Winzer'),
    new ItemList('Alejandrina Pallas'),
    new ItemList('Rosy Tippins'),
    new ItemList('Winona Kerrick'),
    new ItemList('Reynaldo Orchard'),
    new ItemList('Shawn Counce'),
    new ItemList('Shemeka Wittner'),
    new ItemList('Sheila Sak'),
    new ItemList('Zola Rodas'),
    new ItemList('Dena Heilman'),
    new ItemList('Concepcion Pickrell'),
    new ItemList('Marylynn Berthiaume'),
    new ItemList('Howard Lipton'),
    new ItemList('Maxine Amon'),
    new ItemList('Iliana Steck'),
    new ItemList('Laverna Cessna'),
    new ItemList('Brittany Rosch'),
    new ItemList('Esteban Ohlinger'),
    new ItemList('Myron Cotner'),
    new ItemList('Geri Donner'),
    new ItemList('Minna Ryckman'),
    new ItemList('Yi Grieco'),
    new ItemList('Lloyd Sneed'),
    new ItemList('Marquis Willmon'),
    new ItemList('Lupita Mattern'),
    new ItemList('Fernande Shirk'),
    new ItemList('Eloise Mccaffrey'),
    new ItemList('Abram Hatter'),
    new ItemList('Karisa Milera'),
    new ItemList('Bailey Eno'),
    new ItemList('Juliane Sinclair'),
    new ItemList('Giselle Labuda'),
    new ItemList('Chelsie Hy'),
    new ItemList('Catina Wohlers'),
    new ItemList('Edris Liberto'),
    new ItemList('Harry Dossett'),
    new ItemList('Yasmin Bohl'),
    new ItemList('Cheyenne Ostlund'),
    new ItemList('Joannie Greenley'),
    new ItemList('Sherril Colin'),
    new ItemList('Mariann Frasca'),
    new ItemList('Sena Henningsen'),
    new ItemList('Cami Ringo'),
  ];
  selectedItems: ItemList[] = new Array<ItemList>();
  filteredItems: ItemList[];
  // filteredItems: Observable<ItemList[]>;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  writeValue(value: any) {
    console.log(value, 'Inside writeValue');
  }
  registerOnChange(fn: Function) {
    this.changeCallback = fn;
  }
  registerOnTouched(fn: Function) {
    this.touchedCallback = fn;
  }

  lastFilter = '';

  ngOnInit() {
    this.itemControl.valueChanges
      .pipe(
        startWith<string | ItemList[]>(''),
        map((value) => (typeof value === 'string' ? value : this.lastFilter)),
        map((filter) => this.filter(filter))
      )
      .subscribe((data) => (this.filteredItems = data));
  }
  clicker() {
    this.inputTrigger.openPanel();
  }
  filter(filter: string): ItemList[] {
    this.lastFilter = filter;
    if (filter) {
      return this.items.filter((option) => {
        return option.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.items.slice();
    }
  }

  optionClicked(event: Event, item: ItemList) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    let len = this.filteredItems.length;
    if (this.isAllSelected) {
      for (let i = 0; i++; i < len) this.filteredItems[i].selected = true;
      // this.selectedItems = data;
      this.selectedItems = this.filteredItems;
      // for ( let i=0; i++; i<len )
      //   this.items[i].selected = true;
      // this.filteredItems. = [...this.items];
      this.changeCallback(this.selectedItems);
      this.cd.markForCheck();
      // this.itemControl.updateValueAndValidity();
    } else {
      this.selectedItems = [];
      // for ( let i=0; i++; i<len )
      // this.items[i].selected = false;
    }
    this.changeCallback(this.selectedItems);
  }
  toggleSelection(item: ItemList) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedItems.push(item);
      this.changeCallback(this.selectedItems);
    } else {
      const i = this.selectedItems.findIndex(
        (value) => value.item === item.item
      );
      this.selectedItems.splice(i, 1);
      this.changeCallback(this.selectedItems);
    }
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }
}
