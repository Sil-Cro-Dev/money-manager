import {
    AfterViewInit,
    Component, Inject, Input, NgZone, OnDestroy, PLATFORM_ID
} from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser, JsonPipe} from "@angular/common";

export type DatiGraficoTorta = {
    category: string;
    value: number
}

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [
        JsonPipe
    ],
    template: `
        <pre>Dati uscite: {{ datiGrafico | json }}</pre>
        <div id="chartdiv" style="width: 100%; height: 400px;"></div>
    `,
    styles: ``
})
export class PieChartComponent implements OnDestroy, AfterViewInit {
    private root!: am5.Root;
    @Input() datiGrafico: { value: number, category: string }[] = [];

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
    }

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit() {
        this.browserOnly(() => {
            this.initChart();
        });
    }

    private initChart() {
        let root = am5.Root.new('chartdiv');
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout,
            innerRadius: am5.percent(50)
        }));

        let series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        }));

        series.labels.template.setAll({
            textType: "circular",
            centerX: 0,
            centerY: 0
        });

        series.data.setAll(this.datiGrafico)

        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15,
        }));

        legend.data.setAll(series.dataItems);

        series.appear(1000, 100).then();

        this.root = root;
    }


    ngOnDestroy(): void {
        this.browserOnly(() => {
            if (this.root) {
                this.root.dispose();
            }
        });
    }


}
