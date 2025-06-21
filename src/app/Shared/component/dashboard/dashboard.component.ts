import {Component, OnInit} from '@angular/core';
import {TransazioneService} from "../../../modules/transazione/transazione.service";
import {tap} from "rxjs";
import {TIPO_TRANSAZIONE} from "../../Models/enums";
import {Transazione} from "../../Models/Transazione";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {BudgetComponent} from "../../../modules/budget/budget.component";
import {BilancioTotaleComponent} from "./bilancio-totale/bilancio-totale.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatFabButton,
        MatIcon,
        BudgetComponent,
        BilancioTotaleComponent,
        // BudgetComponent
    ],
    template: `
        <div class="flex flex-col">
            <app-bilancio-totale [entrate]="totaleEntrate" [uscite]="totaleUscite" />
          
            <app-budget [transazioni]="transazioniUscite"/>
            
        </div>
    `,
    styles: ``
})
export class DashboardComponent implements OnInit {

    totaleEntrate: number = 0;
    totaleUscite: number = 0;
    transazioniUscite: Transazione[] = [];


    constructor(private transazioneService: TransazioneService) {
    }


    ngOnInit() {
        this.getTransazioni()
    }


    private getTransazioni() {
        this.transazioneService
            .getTransazioni()
            .pipe(
                tap(res => {
                        this.totaleEntrate = res.filter(t => t.tipologia == TIPO_TRANSAZIONE.ENTRATA).reduce((totale, transazione) => totale + transazione.importo, 0)
                        this.totaleUscite = res.filter(t => t.tipologia == TIPO_TRANSAZIONE.USCITA)
                            .map(t => {
                                this.transazioniUscite.push(t)
                                return t
                            })
                            .reduce((totale, transazione) => totale + transazione.importo, 0)
                    }
                )
            )
            .subscribe()
    }


}
