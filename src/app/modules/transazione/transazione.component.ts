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
import {CategoriaService} from "../../Shared/Services/categoria.service";
import {Categoria} from "../../Shared/Models/Categoria";
import {TransazioneService} from "../../Shared/Services/transazione.service";
import {Transazione} from "../../Shared/Models/Transazione";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/TIPO_TRANSAZIONE";
import {CategoriaComponent} from "../categoria/categoria.component";
import {toggleFocus} from "../../Shared/metodUtils";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-transazione',
  standalone: true,
  providers: [
  ],
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
    MatSuffix
  ],
  template: `
    <!--        <mat-card class="w-full ">-->
    <mat-card-header class="flex flex-row flex-wrap items-center justify-between mb-2">
      <mat-card-title class=" from-finance-blue font-semibold">
        Nuova Transazione
      </mat-card-title>
      <button mat-mini-fab class="mini-fab-danger" (click)="chiudi()">
        <mat-icon class="color-secondary">close</mat-icon>
      </button>
    </mat-card-header>

    <mat-card-content [formGroup]="transazioneForm">
      <div class="flex flex-col w-full ">
        <mat-label class="font-medium">Tipo</mat-label>
        <mat-form-field appearance="outline" class="w-full">
          <mat-select formControlName="tipologia">
            <mat-option value="{{TIPO_TRANSAZIONE.USCITA}}">Uscita</mat-option>
            <mat-option value="{{TIPO_TRANSAZIONE.ENTRATA}}">Entrata</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="flex flex-col w-full">
        <mat-label class="font-medium">Importo</mat-label>
        <mat-form-field appearance="outline" class="w-full">
          <input matInput type="number" placeholder="0,00" formControlName="importo" #importoInput
                 (focus)="toggleFocus(importoRef)" (blur)="toggleFocus(importoRef)">
          <span matTextPrefix>€&nbsp;</span>
        </mat-form-field>
      </div>

      <div class="flex flex-col w-full">
        <mat-label class="font-medium">Data transazione</mat-label>
        <mat-form-field appearance="outline">
          <input matInput [matDatepicker]="picker" formControlName="data">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
      </div>

      <div class="flex flex-col w-full">
        <mat-label class="font-medium">Descrizione</mat-label>
        <mat-form-field appearance="outline" class="w-full ">
          <input matInput placeholder="Descrizione" formControlName="descrizione" #descrizioneInput
                 (focus)="toggleFocus(descrizioneRef)" (blur)="toggleFocus(descrizioneRef)">
        </mat-form-field>
      </div>

      <div class="flex flex-col w-full">
        <mat-label class="font-medium">Categoria</mat-label>
        <div class="flex flex-row gap-4">
          <mat-form-field appearance="outline" class="w-full ">
            <mat-select placeholder="Categoria" formControlName="categoria" value="">
              @for (categoria of categorie; track categoria.id) {
                <mat-option value="{{ categoria.id }}">{{ categoria.nomeCategoria }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <button mat-mini-fab style="height: 55px" (click)="aggiungiCategoria()">
            <mat-icon class="">add</mat-icon>
          </button>
        </div>
      </div>

      <mat-slide-toggle color='primary' formControlName="spesaRicorrente"><b> Spesa fissa (si ripete ogni
        mese) </b></mat-slide-toggle>


    </mat-card-content>
    <mat-card-footer class="flex flex-row gap-2 p-2 mt-2 justify-between w-full">
      <button mat-fab extended class="min-w-full" (click)="aggiungiTransazione()">
        <mat-icon>add</mat-icon>
        Aggiungi transazione
      </button>
    </mat-card-footer>
    <!--        </mat-card>-->
  `,
  styles: `
  `
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
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private bottomSheetRef: MatBottomSheetRef<TransazioneComponent>,
    private categoriaService: CategoriaService,
    private transazioneService: TransazioneService
  ) {
  }

  ngOnInit(): void {
    this.initSelectTipologia();
  }

  initSelectTipologia() {
    this.categoriaService.getCategorieUscita().then((res) => this.categorie = res)

    this.transazioneForm.get('tipologia')?.valueChanges.subscribe(
      val => (val != null)
        ? val == TIPO_TRANSAZIONE.USCITA
          ? this.categoriaService.getCategorieUscita().then(res => this.categorie = res)
          : this.categoriaService.getCategorieEntrata().then(res => this.categorie = res)
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
        giorno: dataTransazione.getDay(),
        mese:  dataTransazione.getMonth(),
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

  chiudi(data?: any) {
    this.bottomSheetRef.dismiss(data);
  }

  aggiungiCategoria() {
    this._bottomSheet.open(CategoriaComponent, {
      data: {
        provenienza: 'transazione',
        tipologia: this.transazioneForm.get('tipologia')!.value!
      }
    }).afterDismissed().subscribe();
  }

}
