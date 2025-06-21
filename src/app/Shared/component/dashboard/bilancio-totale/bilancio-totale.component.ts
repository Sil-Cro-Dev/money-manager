import {Component, Input} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {MatCard, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {meseCorrente} from "../../../metodUtils";

@Component({
    selector: 'app-bilancio-totale',
    standalone: true,
    imports: [
        DecimalPipe,
        MatCard,
        MatCardFooter,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
        MatMiniFabButton,
        MatProgressBar
    ],
    templateUrl: './bilancio-totale.component.html',
    styleUrl: './bilancio-totale.component.scss'
})
export class BilancioTotaleComponent {

    protected readonly meseCorrente = meseCorrente;
    @Input() entrate!: number;
    @Input() uscite!: number;
    today = new Date();

    percentualeUsata(): number {
        if (Math.min((this.uscite / this.entrate) * 100, 100)) {
            return Math.min((this.uscite / this.entrate) * 100, 100)
        } else return 0;
    }

    rimanente(): number {
        return Math.max(this.entrate - this.uscite, 0);
    }

}
