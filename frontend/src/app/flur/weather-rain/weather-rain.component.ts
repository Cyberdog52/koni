import { Component, OnInit } from '@angular/core';
import {FlurTabBaseComponent} from "../flur-tab-base/flur-tab-base.component";

@Component({
  selector: 'app-weather-rain',
  templateUrl: './weather-rain.component.html',
  styleUrls: ['./weather-rain.component.scss']
})
export class WeatherRainComponent extends FlurTabBaseComponent implements OnInit {

  constructor() { super();}

  ngOnInit() {
    this.chartColors.push({
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    });
  }

}
