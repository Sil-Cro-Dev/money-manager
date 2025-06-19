import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BudgetService} from "./budget.service";
import {CategoriaService} from "../categoria/categoria.service";
import {Categoria} from "../../Shared/Models/Categoria";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TIPO_BUDGET, TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {SheetCardHeaderComponent} from "../../Shared/theme/sheet-card-heade/sheet-card-header.component";
import {toggleFocus} from "../../Shared/metodUtils";
import {MatInput} from "@angular/material/input";
import {openAggiungiCategoria} from "../categoria/categoriaUtils";
import {Budget} from "../../Shared/Models/Budget";
import {merge} from "rxjs";

@Component({
  selector: 'app-insert-budget',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatLabel,
    MatMiniFabButton,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatCardHeader,
    MatCardTitle,
    SheetCardHeaderComponent,
    MatCardContent,
    MatCardFooter,
    MatFabButton,
    MatInput,
    MatPrefix
  ],
  templateUrl: 'insert-budget.component.html',
  styles: ``
})
export class InsertBudgetComponent implements OnInit {

  @ViewChild('importoInput') importoRef!: ElementRef;
  protected readonly TIPO_BUDGET = TIPO_BUDGET;
  protected readonly toggleFocus = toggleFocus;
  categorie: Categoria[] = [];
  budgetForm = this.fb.group({
    tipoBudget: [TIPO_BUDGET.SETTIMANALE, Validators.required],
    importo: [null, Validators.required],
    idCategoria: [null, Validators.required]
  });

  constructor(
    protected bottomSheetRef: MatBottomSheetRef<InsertBudgetComponent>,
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private budgetService: BudgetService,
    private categoriaService: CategoriaService,
  ) {
  }

  ngOnInit(): void {
    this.initCategoriaSelect()
  }

  initCategoriaSelect() {
    const $catUsc = this.categoriaService.getCategorieUscita();
    const $catEnt = this.categoriaService.getCategorieEntrata();

    merge($catUsc, $catEnt).subscribe((res) => this.categorie.push(...res))
  }

  aggiungiBudget() {
    if (this.budgetForm.valid) {
      let idCat = this.budgetForm.get('idCategoria')!.value!
      let budget: Budget = {
        idCategoria: idCat,
        nomeCategoria: this.categorie.find(cat => cat.id == idCat)?.nomeCategoria,
        tipoBudget: this.budgetForm.get('tipoBudget')!.value!,
        importo: this.budgetForm.get('importo')!.value!
      }

      this.budgetService.aggiungiBudget(budget).then(r => {
        if(r) this.chiudi(r);
      })
    } else this.budgetForm.markAllAsTouched();

  }

//   Gestione dello sheet

  openCat() {
    openAggiungiCategoria(this._bottomSheet, 'budget', TIPO_TRANSAZIONE.USCITA)
  }

  chiudi(data?: any) {
    this.bottomSheetRef.dismiss(data);
  }


}
