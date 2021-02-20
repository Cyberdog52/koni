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
  }

}
