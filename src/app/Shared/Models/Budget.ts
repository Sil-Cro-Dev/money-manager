import {TIPO_BUDGET} from "./enums";

export interface Budget {

    id?: string;
    importo: number;
    tipoBudget: TIPO_BUDGET;
    nomeCategoria?: string;
    idCategoria?: string;

}
