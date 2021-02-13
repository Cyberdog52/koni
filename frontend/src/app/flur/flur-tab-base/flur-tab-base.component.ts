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

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartLabels = this.observations.map(obs => obs.date);
    this.chartDatasets.push({data: this.observations.map(obs => obs.value), label: "Abfluss"});
  }


  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
