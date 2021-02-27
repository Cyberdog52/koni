import { Component, OnInit } from '@angular/core';
import {FlurTabBaseComponent} from "../flur-tab-base/flur-tab-base.component";

@Component({
  selector: 'app-flur-level',
  templateUrl: './flur-level.component.html',
  styleUrls: ['./flur-level.component.scss']
})
export class FlurLevelComponent extends FlurTabBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.chartColors.push({
      backgroundColor: 'rgba(10,0,96,0.64)',
      borderColor: 'rgba(41,0,81,0.91)',
      borderWidth: 2,
    });
  }

  getTitleValue(): string {
    const lastObservation = this.observations[this.observations.length-1];
    return lastObservation.value.toFixed(0) + "cm";
  }
}
