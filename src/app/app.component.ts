import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabBody, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {MatFabButton} from "@angular/material/button";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TransazioneComponent} from "./modules/transazione/transazione.component";
import {PieComponent} from "./Shared/charts/pie/pie.component";
import {TIPO_TRANSAZIONE} from "./Shared/Models/enums";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PieChartComponent} from "./Shared/charts/pie-chart/pie-chart.component";
import {JsonPipe} from "@angular/common";
import {DashboardComponent} from "./Shared/component/dashboard/dashboard.component";
import {InsertBudgetComponent} from "./modules/budget/insert-budget/insert-budget.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        MatTab,
        MatTabGroup,
        MatFabButton,
        MatMenuTrigger,
        MatMenu,
        MatMenuContent,
        MatMenuItem,
        MatIcon,
        MatCard,
        TransazioneComponent,
        MatTabBody,
        PieComponent,
        MatTabContent,
        MatProgressBar,
        PieChartComponent,
        JsonPipe,
        DashboardComponent
    ],
    providers: [],
    template: `
      <mat-card class="h-full rounded-none" style="border-radius: 0">
        <mat-tab-group class="w-full min-h-full">
          <mat-tab label="📊 Dashboard">
            <app-dashboard/>
          </mat-tab>
          <mat-tab label="💸 Transazioni">Transazioni</mat-tab>
          <mat-tab label="🏷️ Categorie">Categorie</mat-tab>
        </mat-tab-group>
        <button mat-fab color="primary" style="position: fixed" class="fixed right-4 bottom-4"
                (click)="apriTransazioni()">
          <mat-icon>add</mat-icon>
        </button>
      </mat-card>
    `,
    styles: `
    `
})
export class AppComponent implements OnInit {

    isLoading: boolean = false;


    constructor(
        private _bottomSheet: MatBottomSheet) {
    }

    ngOnInit(): void {
    }


    apriTransazioni(): void {
        this._bottomSheet.open(TransazioneComponent).afterDismissed()
            .subscribe(res => {
                if (res) {
                    res.provenienza == TIPO_TRANSAZIONE.USCITA ? this.getUscite() : this.getEntrate();
                }
            });
    }

    getUscite() {
    }

    getEntrate() {
    }



}
