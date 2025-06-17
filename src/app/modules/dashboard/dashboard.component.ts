import {Component, OnInit} from '@angular/core';
import {TransazioneService} from "../../Shared/Services/transazione.service";
import { tap} from "rxjs";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/TIPO_TRANSAZIONE";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
    ],
    template: `
        <div class="flex flex-col">
            <span>Totale Entrate: {{totaleEntrate}}€</span>
            <span>Totale Uscite: {{totaleUscite}}€</span>
            <span>Bilancio: {{totaleEntrate - totaleUscite}}€</span>
        </div>
    `,
    styles: ``
})
export class DashboardComponent implements OnInit {

    totaleEntrate: number = 0;
    totaleUscite: number = 0;



    constructor(private transazioneService: TransazioneService) {
    }


    ngOnInit() {
        this.getTransazioni()
    }


    private getTransazioni() {
        this.transazioneService.getTransazioni()
            .pipe(
                tap( res => {
                    this.totaleEntrate = res.filter(t => t.tipologia == TIPO_TRANSAZIONE.ENTRATA).reduce((totale, transazione) => totale + transazione.importo, 0)
                    this.totaleUscite = res.filter(t => t.tipologia == TIPO_TRANSAZIONE.USCITA).reduce((totale, transazione) => totale + transazione.importo, 0)
                    }
                )
            )
            .subscribe()
    }
}
