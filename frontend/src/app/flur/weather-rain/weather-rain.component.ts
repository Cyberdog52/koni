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
  }

}
