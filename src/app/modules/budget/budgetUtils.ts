import {Budget} from "../../Shared/Models/Budget";
import {TIPO_BUDGET, TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {Transazione} from "../../Shared/Models/Transazione";

export function getSpesaPerBudget(transazioni: Transazione[], budget: Budget): number {
    let today = new Date();
    return transazioni
        .filter(t => t.idCategoria === budget.idCategoria && t.tipologia === TIPO_TRANSAZIONE.USCITA)
        .filter(t => {
            return budget.tipoBudget === TIPO_BUDGET.SETTIMANALE ?
                getSettimana(t.giorno, t.mese, t.anno) === getSettimana(today.getDate(), today.getMonth() + 1, today.getFullYear()) && t.anno === today.getFullYear() :
                t.mese === today.getMonth() && t.anno === today.getFullYear();
        })
        .reduce((acc, t) => acc + t.importo, 0);
}

export function getSettimana(giorno: number, mese: number, anno: number): number {
    return getWeekNumber(new Date(anno, mese, giorno));
}

export function getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const dayNum = tempDate.getDay() || 7; // 1 = lunedì, 7 = domenica
    tempDate.setDate(tempDate.getDate() + 4 - dayNum); // vai al giovedì della settimana corrente
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
