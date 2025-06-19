import {CategoriaComponent} from "./categoria.component";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

export function openAggiungiCategoria(bottomSheet: MatBottomSheet, provenienza: string, tipologia: TIPO_TRANSAZIONE) {
  bottomSheet.open(CategoriaComponent, {
    data: {
      provenienza: provenienza,
      tipologia: tipologia
    }
  }).afterDismissed().subscribe();
}
