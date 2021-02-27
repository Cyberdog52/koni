import { Component, OnInit } from '@angular/core';
import {FlurTabBaseComponent} from "../flur-tab-base/flur-tab-base.component";

@Component({
  selector: 'app-flur-temperature',
  templateUrl: './flur-temperature.component.html',
  styleUrls: ['./flur-temperature.component.scss']
})
export class FlurTemperatureComponent extends FlurTabBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.chartColors.push({
      backgroundColor: 'rgba(160,231,255,0.61)',
      borderColor: 'rgba(100,190,230,0.76)',
      borderWidth: 2,
    });
  }

  getTitleValue(): string {
    const lastObservation = this.observations[this.observations.length-1];
    return lastObservation.value.toFixed(1) + "°";
  }
}
