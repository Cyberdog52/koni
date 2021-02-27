import { Component, OnInit } from '@angular/core';
import {FlurTabBaseComponent} from "../flur-tab-base/flur-tab-base.component";

@Component({
  selector: 'app-weather-wind',
  templateUrl: './weather-wind.component.html',
  styleUrls: ['./weather-wind.component.scss']
})
export class WeatherWindComponent extends FlurTabBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.chartColors.push({
      backgroundColor: 'rgba(127,137,96,0.2)',
      borderColor: 'rgba(130,129,126,0.7)',
      borderWidth: 2,
    });
  }

}
