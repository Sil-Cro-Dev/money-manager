import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSuffix
} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgFor} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CategoriaService} from "../categoria/categoria.service";
import {Categoria} from "../../Shared/Models/Categoria";
import {TransazioneService} from "./transazione.service";
import {Transazione} from "../../Shared/Models/Transazione";
import {toggleFocus} from "../../Shared/metodUtils";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {SheetCardHeaderComponent} from "../../Shared/theme/sheet-card-heade/sheet-card-header.component";
import {openAggiungiCategoria} from "../categoria/categoriaUtils";

@Component({
  selector: 'app-transazione',
  standalone: true,
  providers: [],
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatSelect,
    MatOption,
    MatInput,
    MatFormField,
    MatIcon,
    MatLabel,
    MatPrefix,
    NgFor,
    MatSlideToggle,
    MatFabButton,
    ReactiveFormsModule,
    MatError,
    MatCardFooter,
    MatMiniFabButton,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatHint,
    MatSuffix,
    SheetCardHeaderComponent
  ],
  templateUrl: 'transazione.component.html',
  styles: ``
})
export class TransazioneComponent implements OnInit {

  @ViewChild('importoInput') importoRef!: ElementRef;
  @ViewChild('descrizioneInput') descrizioneRef!: ElementRef;
  protected readonly toggleFocus = toggleFocus;
  protected readonly TIPO_TRANSAZIONE = TIPO_TRANSAZIONE;
  categorie: Categoria[] = [];
  transazioneForm = this.fb.group({
    tipologia: [TIPO_TRANSAZIONE.USCITA, Validators.required],
    importo: [null, Validators.required],
    descrizione: [null],
    categoria: [null, Validators.required],
    spesaRicorrente: [false, Validators.required],
    data: [new Date(), Validators.required]
  });

  constructor(
    protected bottomSheetRef: MatBottomSheetRef<TransazioneComponent>,
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private categoriaService: CategoriaService,
    private transazioneService: TransazioneService
  ) {
  }

  ngOnInit(): void {
    this.initSelectTipologia();
  }

  initSelectTipologia() {
    this.categoriaService.getCategorieUscita().subscribe((res) => this.categorie = res)

    this.transazioneForm.get('tipologia')?.valueChanges.subscribe(
      val => (val != null)
        ? val == TIPO_TRANSAZIONE.USCITA
          ? this.categoriaService.getCategorieUscita().subscribe(res => this.categorie = res)
          : this.categoriaService.getCategorieEntrata().subscribe(res => this.categorie = res)
        : null
    )
  }

  aggiungiTransazione() {
    if (this.transazioneForm.valid) {
      let dataTransazione = this.transazioneForm.get('data')!.value!
      let transazione: Transazione = {
        tipologia: this.transazioneForm.get('tipologia')!.value!,
        idCategoria: this.transazioneForm.get('categoria')!.value!,
        importo: this.transazioneForm.get('importo')!.value!,
        descrizione: this.transazioneForm.get('descrizione')?.value,
        spesaRicorrente: this.transazioneForm.get('spesaRicorrente')!.value!,
        data: dataTransazione,
        giorno: dataTransazione.getDate(),
        mese: dataTransazione.getMonth(),
        anno: dataTransazione.getFullYear(),
      }
      this.transazioneService.aggiungiTransazione(transazione).subscribe(res => {
        res ? this.chiudi({
          res: res,
          provenienza: this.transazioneForm.get('tipologia')!.value!
        }) : this.chiudi()
      });
    } else this.transazioneForm.markAllAsTouched();
  }

//   Gestione dello Sheet

  openCat() {
    openAggiungiCategoria(this._bottomSheet, 'transazione', this.transazioneForm.get('tipologia')!.value!)
  }

  chiudi(data?: any) {
    this.bottomSheetRef.dismiss(data);
  }

}
