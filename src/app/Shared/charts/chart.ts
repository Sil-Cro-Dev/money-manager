// import {TIPO_TRANSAZIONE} from "../Shared/Models/TIPO_TRANSAZIONE";
// import {finalize, forkJoin, map, Observable, switchMap, tap} from "rxjs";
// import {Transazione} from "../Shared/Models/Transazione";
// import {Categoria} from "../Shared/Models/Categoria";
// import {DatiGraficoTorta} from "../Shared/charts/pie-chart/pie-chart.component";
//
// getUscite() {
//     this.getTransazioni(
//         this.transazioneService.getUscite(),
//         this.categoriaService.getCategoriaUscitaById.bind(this.categoriaService),
//         this.datiGraficoUscite,
//         TIPO_TRANSAZIONE.USCITA
//     )
// }
//
// getEntrate() {
//     this.getTransazioni(
//         this.transazioneService.getEntrate(),
//         this.categoriaService.getCategoriaEntrateById.bind(this.categoriaService),
//         this.datiGraficoEntrate,
//         TIPO_TRANSAZIONE.ENTRATA
//     )
// }
//
// getTransazioni(
//     transazioni$: Observable<Transazione[]>,
//     getCategoriaById: (id: string) => Observable<Categoria>,
//     datiGrafico: DatiGraficoTorta[],
//     tipologia: TIPO_TRANSAZIONE
// ) {
//     this.isLoading = true;
//     transazioni$.pipe(
//         switchMap((trans: Transazione[]) => {
//             let idCategorie = Array.from(new Set(trans.map(t => t.idCategoria)));
//             let richiesteCategorie$ = idCategorie.map(id => getCategoriaById(id));
//             return forkJoin(richiesteCategorie$).pipe(
//                 map((categorie) => ({
//                     categorie,
//                     transazioni: trans
//                 }))
//             );
//         }),
//         tap(({categorie, transazioni}) => {
//             const nuoviDati =   categorie.map(cat => {
//                     let series = transazioni
//                         .filter(t => t.idCategoria === cat.id)
//                         .reduce((tot, t) => tot + t.importo, 0)
//                     let label = cat.nomeCategoria.concat(`${tipologia == TIPO_TRANSAZIONE.USCITA ? ' - Totale spese: ' : ' - Totale entrate: '}` + series)
//                     return {value: series, category: label} as DatiGraficoTorta
//                 }
//             )
//             datiGrafico.push(...nuoviDati);
//         }),
//         finalize(() => this.isLoading = false)
//     ).subscribe();
// }




//
// <!--                                        <div class=" flex lg:flex-row lg:gap-0 flex-col gap-4">-->
// <!--                                            @if (isLoading) {-->
// <!--                                                <mat-progress-bar mode="indeterminate"></mat-progress-bar>-->
// <!--                                            }-->
// <!--&lt;!&ndash;&ndash;&gt;-->
// <!--                                            @if (window.innerWidth > 1024) {-->
// <!--                                                <app-pie class="w-1/2 p-2" [datiGrafico]="datiGraficoUscite"></app-pie>-->
//                 <!--                                                <app-pie class="w-1/2 p-2" [datiGrafico]="datiGraficoEntrate"></app-pie>-->
// <!--                                            } @else {-->
// <!--                            <mat-tab-group headerPosition="below" class="w-full "-->
// <!--                                           (selectedTabChange)="onselectionchange($event)">-->
// <!--                                <mat-tab label="💸 Uscite">-->
// <!--                                    <ng-template matTabContent>-->
// <!--                                                            <app-pie class="w-full p-2" [datiGrafico]="datiGraficoUscite"></app-pie>-->
//                 <!--                                                        </ng-template>-->
//                 <!--                                </mat-tab>-->
// <!--                                <mat-tab label="💸 Entrate">-->
// <!--                                    <ng-template matTabContent>-->
// <!--                                        <app-pie class="w-full p-2" [datiGrafico]="datiGraficoEntrate"></app-pie>-->
//                 <!--                                    </ng-template>-->
//                 <!--                                </mat-tab>-->
//                 <!--                            </mat-tab-group>-->
// <!--                        }-->
// <!--                        <app-pie-chart [datiGrafico]="datiGraficoUscite"/>-->
// <!--                    </div>-->
