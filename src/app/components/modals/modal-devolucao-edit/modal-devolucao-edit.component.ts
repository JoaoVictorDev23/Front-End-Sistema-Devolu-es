import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface PeriodicElement {
  nome: string;
  situacao: string;
  quantidade: number;
  valor: number;
}
const ELEMENT_DATA2: PeriodicElement[] = [
  {nome: '1', situacao: 'Hydrogen', quantidade: 1.0079, valor: 2},
  {nome: '2', situacao: 'Helium', quantidade: 4.0026, valor: 3},
  {nome: '3', situacao: 'Lithium', quantidade: 6.941, valor: 4},
  {nome: '4', situacao: 'Beryllium', quantidade: 9.0122, valor: 5},
  {nome: '5', situacao: 'Boron', quantidade: 10.811, valor: 6},
  {nome: '6', situacao: 'Carbon', quantidade: 12.0107, valor: 7},
  {nome: '7', situacao: 'Nitrogen', quantidade: 14.0067, valor: 8},
  {nome: '8', situacao: 'Oxygen', quantidade: 15.9994, valor: 9},
  {nome: '9', situacao: 'Fluorine', quantidade: 18.9984, valor: 10},
  {nome: '10', situacao: 'Neon', quantidade: 20.1797, valor: 11},
];
@Component({
  selector: 'app-modal-devolucao-edit',
  templateUrl: './modal-devolucao-edit.component.html',
  styleUrls: ['./modal-devolucao-edit.component.scss']
})
export class ModalDevolucaoEditComponent  implements OnInit{
  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'situacao'];
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
