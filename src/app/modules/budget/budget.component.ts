import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TIPO_BUDGET} from "../../Shared/Models/enums";
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
import {getSpesaPerBudget, getWeekNumber} from "./budgetUtils";
import {meseCorrente} from "../../Shared/metodUtils";

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

    protected readonly meseCorrente = meseCorrente;
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

    getBilancioBudget(budgetCat: Budget) {
        return getSpesaPerBudget(this.transazioni, budgetCat);
    }

    percentualeUsata(budget: Budget): number {
        return Math.min((this.getBilancioBudget(budget) / budget.importo) * 100, 100);
    }

    rimanente(budget: Budget): number {
        const spesa = this.getBilancioBudget(budget);
        return Math.max(budget.importo - spesa, 0);
    }

    apriBudget() {
        this._bottomSheet.open(InsertBudgetComponent).afterDismissed().subscribe(
            (res: any) => {
                if (res) this.getBudgets()
            });
    }

    getNumeroSettimanaCorrente(): number {
        return getWeekNumber(this.today);
    }


   }
