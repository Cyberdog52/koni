import { Component, OnInit } from '@angular/core';
import {FlurTabBaseComponent} from "../flur-tab-base/flur-tab-base.component";

@Component({
  selector: 'app-flur-discharge',
  templateUrl: './flur-discharge.component.html',
  styleUrls: ['./flur-discharge.component.scss']
})
export class FlurDischargeComponent extends FlurTabBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.chartColors.push({
      backgroundColor: 'rgba(0,137,32,0.42)',
      borderColor: 'rgba(0,115,8,0.84)',
      borderWidth: 2,
    });
  }

  getTitleValue(): string {
    const lastObservation = this.observations[this.observations.length-1];
    return lastObservation.value.toFixed(0) + "";
  }
}
