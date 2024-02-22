import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA2: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-modal-devolucao-edit',
  templateUrl: './modal-devolucao-edit.component.html',
  styleUrls: ['./modal-devolucao-edit.component.scss']
})
export class ModalDevolucaoEditComponent  implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA2;

  constructor(private dialogRef: MatDialogRef<ModalDevolucaoEditComponent>) { }
  voltar(): void {
    this.dialogRef.close();
  }

  options: string[] = [];  // Inicializando a propriedade 'options'
  filteredControlOptions$: Observable<string[]> = of([]);  // Inicializando 'filteredControlOptions$'
  filteredNgModelOptions$: Observable<string[]> = of([]);  // Inicializando 'filteredNgModelOptions$'
  inputFormControl: FormControl = new FormControl();  // Inicializando 'inputFormControl'
  value: string = '';  // Inicializando 'value'


  ngOnInit() {

    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredControlOptions$ = of(this.options);
    this.filteredNgModelOptions$ = of(this.options);

    this.inputFormControl = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }

}
