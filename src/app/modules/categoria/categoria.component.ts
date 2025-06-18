import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {CategoriaService} from "../../Shared/Services/categoria.service";
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
    ],
    template: `
        <div>
            <mat-card-header class="flex flex-row flex-wrap items-center justify-between mb-2">
                <mat-card-title class=" from-finance-blue font-semibold">
                    Nuova Transazione
                </mat-card-title>
                <button mat-mini-fab class="mini-fab-danger" (click)="chiudi()">
                    <mat-icon class="color-danger">close</mat-icon>
                </button>
            </mat-card-header>

            <mat-card-content [formGroup]="categoriaForm">
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
                    <mat-label class="font-medium">Descrizione</mat-label>
                    <mat-form-field appearance="outline" class="w-full ">
                        <input matInput placeholder="Nome Categoria" formControlName="nomeCategoria" #nomeCategoriaInput
                               (focus)="toggleFocus(nomeCategoriaRef)" (blur)="toggleFocus(nomeCategoriaRef)">
                    </mat-form-field>
                </div>

            </mat-card-content>
            <mat-card-footer class="flex flex-row gap-2 p-2 mt-2 justify-between w-full">
                <button mat-fab extended class="min-w-full" (click)="aggiungiCategoria()">
                    <mat-icon>add</mat-icon>
                    Aggiungi Categoria
                </button>
            </mat-card-footer>
        </div>
    `,
    styles: ``
})
export class CategoriaComponent implements OnInit {

    @ViewChild('nomeCategoriaInput') nomeCategoriaRef!: ElementRef;
    protected readonly TIPO_TRANSAZIONE = TIPO_TRANSAZIONE;
    categoriaForm = this.fb.group({
        tipologia: [TIPO_TRANSAZIONE.USCITA, Validators.required],
        nomeCategoria: ['', Validators.required],
    });

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public inputData: any,
        private _bottomSheet: MatBottomSheet,
        private bottomSheetRef: MatBottomSheetRef<CategoriaComponent>,
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

    chiudi(data?: any) {
        this.bottomSheetRef.dismiss();
        if (this.inputData.provenienza && this.inputData.provenienza == 'transazione') this._bottomSheet.open(TransazioneComponent);
    }

    protected readonly toggleFocus = toggleFocus;
}
