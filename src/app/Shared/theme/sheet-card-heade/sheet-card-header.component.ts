import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-sheet-card-header',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatMiniFabButton
  ],
  template: `
    <mat-card-header class="flex flex-row flex-wrap items-center justify-between mb-2">
      <mat-card-title class=" from-finance-blue font-semibold">
        {{ titolo }}
      </mat-card-title>
      <button mat-mini-fab class="mini-fab-danger" (click)="emitChiudi()">
        <mat-icon class="color-danger">close</mat-icon>
      </button>
    </mat-card-header>`,
  styles: ``
})
export class SheetCardHeaderComponent {

  @Output() chiudi = new EventEmitter
  @Input() titolo!: string;
  @Input() bottomSheetRef!: MatBottomSheetRef

  emitChiudi() {
    this.chiudi.emit();
  }

}
