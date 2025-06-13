import {ElementRef} from "@angular/core";

export function toggleFocus(elementRef: ElementRef) {
    setTimeout(() => {
        elementRef?.nativeElement?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 300);
}
