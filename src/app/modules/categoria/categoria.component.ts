import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {CategoriaService} from "./categoria.service";
import {Categoria} from "../../Shared/Models/Categoria";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {TransazioneComponent} from "../transazione/transazione.component";
import {toggleFocus} from "../../Shared/metodUtils";
import {InsertBudgetComponent} from "../budget/insert-budget/insert-budget.component";
import {SheetCardHeaderComponent} from "../../Shared/theme/sheet-card-heade/sheet-card-header.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    MatSlideToggle,
    ReactiveFormsModule,
    MatCardHeader,
    MatIcon,
    MatMiniFabButton,
    MatCardContent,
    MatLabel,
    MatSelect,
    MatFormField,
    MatOption,
    MatInput,
    MatCardFooter,
    MatFabButton,
    MatCardTitle,
    SheetCardHeaderComponent,
  ],
  templateUrl: 'categoria.component.html',
  styles: ``
})
export class CategoriaComponent implements OnInit {

  @ViewChild('nomeCategoriaInput') nomeCategoriaRef!: ElementRef;
  protected readonly TIPO_TRANSAZIONE = TIPO_TRANSAZIONE;
  protected readonly toggleFocus = toggleFocus;
  categoriaForm = this.fb.group({
    tipologia: [TIPO_TRANSAZIONE.USCITA, Validators.required],
    nomeCategoria: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public inputData: any,
    protected bottomSheetRef: MatBottomSheetRef<CategoriaComponent>,
    private _bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
    private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaForm.get('tipologia')?.setValue(this.inputData.tipologia);
  }

  aggiungiCategoria() {
    if (this.categoriaForm.valid) {
      let categoria: Categoria = {
        nomeCategoria: this.categoriaForm.get('nomeCategoria')!.value!,
        tipoCategoria: this.categoriaForm.get('tipologia')!.value!
      }
      this.categoriaForm.get('tipologia')?.value == TIPO_TRANSAZIONE.USCITA
        ? this.categoriaService.aggiungiCategoriaUscite(categoria).then(() => this.chiudi())
        : this.categoriaService.aggiungiCategoriaEntrate(categoria).then(() => this.chiudi())
    } else this.categoriaForm.markAllAsTouched();
  }

  // Gestione dello sheet

  chiudi(data?: any) {
    this.bottomSheetRef.dismiss();
    if (this.inputData.provenienza && this.inputData.provenienza == 'transazione') this._bottomSheet.open(TransazioneComponent);
    if (this.inputData.provenienza && this.inputData.provenienza == 'budget') this._bottomSheet.open(InsertBudgetComponent);
  }

}
