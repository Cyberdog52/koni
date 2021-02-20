import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observation} from "../../shared/model/flur-dtos";

@Component({
  selector: 'app-flur-tab-base',
  templateUrl: './flur-tab-base.component.html',
  styleUrls: ['./flur-tab-base.component.scss']
})
export class FlurTabBaseComponent implements OnInit, OnChanges {

  constructor() { }

  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [];

  @Input() observations: Observation[];
  @Input() currentValue: number;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartLabels = this.observations.map(obs => FlurTabBaseComponent.toNiceDateString(obs.date));
    this.chartDatasets.push({data: this.observations.map(obs => obs.value), label: "Abfluss"});
  }

  private static toNiceDateString(str: string) {

    const date = str.split("T")[0];
    const time = str.split("T")[1].split(".")[0];

    const timeString = time.split(":")[0] + ":" + time.split(":")[1];
    const dateString = date.split("-")[2] + "." + date.split("-")[1] + "." + date.split("-")[0].substring(2, 4);

    return dateString + " " + timeString;
  }


  public chartOptions: any = {
    responsive: true,
    easing: "linear",
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 13
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
