import {ElementRef} from "@angular/core";

export function toggleFocus(elementRef: ElementRef) {
    setTimeout(() => {
        elementRef?.nativeElement?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 300);
}


export function meseCorrente(today: Date): string {
    const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return mesi[today.getMonth()] + ' ' + today.getFullYear();
}
