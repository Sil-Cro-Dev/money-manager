import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TIPO_BUDGET, TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {Budget} from "../../Shared/Models/Budget";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatLabel} from "@angular/material/form-field";
import {Transazione} from "../../Shared/Models/Transazione";
import {DecimalPipe} from "@angular/common";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {InsertBudgetComponent} from "./insert-budget/insert-budget.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BudgetService} from "./budget.service";

@Component({
    selector: 'app-budget',
    standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatProgressBar,
        MatLabel,
        MatCardHeader,
        MatCardContent,
        MatCardFooter,
        DecimalPipe,
        MatFabButton,
        MatIcon,
        MatMiniFabButton,
    ],
    templateUrl: 'budget.component.html',
    styles: ``
})
export class BudgetComponent implements OnInit {

    protected readonly TIPO_BUDGET = TIPO_BUDGET;
    @Input() transazioni: Transazione[] = [];
    today = new Date();
    budgets: Budget[] = []

    constructor(
        private _bottomSheet: MatBottomSheet,
        private budgetService: BudgetService
    ) {
    }

    ngOnInit(): void {
        this.getBudgets()
    }

    getBudgets() {
        this.budgetService.getBudgets().then(res => this.budgets = res);
    }

    percentualeUsata(budget: Budget): number {
        return Math.min((this.getSpesaPerBudget(budget) / budget.importo) * 100, 100);
    }

    rimanente(budget: Budget): number {
        const spesa = this.getSpesaPerBudget(budget);
        return Math.max(budget.importo - spesa, 0);
    }

    getSpesaPerBudget(budget: Budget): number {
        return this.transazioni
            .filter(t => t.idCategoria === budget.idCategoria && t.tipologia === TIPO_TRANSAZIONE.USCITA)
            .filter(t => {
                return budget.tipoBudget === TIPO_BUDGET.SETTIMANALE ?
                    this.getSettimana(t.giorno, t.mese, t.anno) === this.getSettimana(this.today.getDate(), this.today.getMonth(), this.today.getFullYear()) && t.anno === this.today.getFullYear() :
                    t.mese === this.today.getMonth() && t.anno === this.today.getFullYear();
            })
            .reduce((acc, t) => acc + t.importo, 0);
    }


    getSettimana(giorno: number, mese: number, anno: number): number {
        return this.getWeekNumber(new Date(anno, mese, giorno));
    }

    getWeekNumber(date: Date): number {
        const tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dayNum = tempDate.getDay() || 7; // 1 = lunedì, 7 = domenica
        tempDate.setDate(tempDate.getDate() + 4 - dayNum); // vai al giovedì della settimana corrente
        const yearStart = new Date(tempDate.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return weekNumber;
    }

    apriBudget() {
        this._bottomSheet.open(InsertBudgetComponent).afterDismissed().subscribe(
            (res: any) => {
                if (res) this.getBudgets()
            });
    }

    getNumeroSettimanaCorrente(): number {
        return this.getWeekNumber(this.today);
    }

    get meseCorrente(): string {
        const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        return mesi[this.today.getMonth()] + ' ' + this.today.getFullYear();
    }
}
