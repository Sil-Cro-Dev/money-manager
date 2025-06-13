import {Component, inject, OnInit} from '@angular/core';
import {MatTab, MatTabBody, MatTabGroup} from "@angular/material/tabs";
import {MatFabButton} from "@angular/material/button";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TransazioneComponent} from "./modules/transazione/transazione.component";
import {TransazioneService} from "./Shared/Services/transazione.service";
import {Transazione} from "./Shared/Models/Transazione";
import {JSON} from "@jsonjoy.com/util/lib/json-brand";

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
        MatTabBody
    ],
    providers: [],
    template: `
        <mat-card class="h-full rounded-none" style="border-radius: 0">
            <mat-tab-group class="w-full min-h-full">
                <mat-tab label="📊 Dashboard">
                    <div class="min-h-full">
                        @for (uscita of uscite; track uscita.id) {
                            <pre>{{ JSON.stringify(uscita) }}</pre>
                        }
                    </div>
                </mat-tab>
                <mat-tab label="💸 Transazioni">Transazioni</mat-tab>
                <mat-tab label="🏷️ Categorie">Categorie</mat-tab>
            </mat-tab-group>
            <!--      <router-outlet></router-outlet>-->

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

    private _bottomSheet = inject(MatBottomSheet);
    uscite: Transazione[] | undefined;

    constructor(private transazioneService: TransazioneService) {
    }

    ngOnInit(): void {
        this.getUscite();
    }


    apriTransazioni(): void {
        this._bottomSheet.open(TransazioneComponent).afterDismissed().subscribe(res => {
            if (res) this.getUscite();
        });
    }

    getUscite() {
        this.transazioneService.getUscite().then(res => this.uscite = res)
    }


    protected readonly JSON = JSON;
}
