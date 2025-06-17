import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ChartComponent} from "ngx-apexcharts";

import {
    ApexChart,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexTitleSubtitle
} from 'ngx-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
    title?: ApexTitleSubtitle;
};

export type DatiGraficoPie = {
    title: string;
    labels: string[];
    series: number[]
}

@Component({
    selector: 'app-pie',
    standalone: true,
    imports: [
        ChartComponent
    ],
    template: `
        @if (chartOptions) {
            <apx-chart
                    [series]="chartOptions.series!"
                    [chart]="chartOptions.chart!"
                    [labels]="chartOptions.labels!"
                    [responsive]="chartOptions.responsive!"
                    [title]="chartOptions.title!">
            </apx-chart>   
        }
    `,
    styles: ``
})
export class PieComponent implements OnChanges {

    @Input() datiGrafico?: DatiGraficoPie;
    chartOptions: Partial<ChartOptions> | undefined;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['datiGrafico'] && this.datiGrafico) {
            this.chartOptions = {
                chart: {
                    type: 'donut',
                    width: '460px',
                },
                title: {
                    text: 'Grafico ' + this.datiGrafico?.title,
                    align: 'center'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {width: '100%'},
                        legend: {position: 'bottom'}
                    }
                }],
                labels: this.datiGrafico?.labels,
                series: this.datiGrafico?.series
            };
        }
    }


}
