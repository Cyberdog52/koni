import {Component, Input, OnInit} from '@angular/core';
import {Weather} from "../../shared/model/flur-dtos";

@Component({
  selector: 'app-flur-overview',
  templateUrl: './flur-overview.component.html',
  styleUrls: ['./flur-overview.component.scss']
})
export class FlurOverviewComponent implements OnInit {

  @Input() weather: Weather;
  @Input() waterTemperatureString: string;
  @Input() dischargeString: string;
  @Input() levelString: string;

  constructor() { }

  ngOnInit() {
  }

  getWeatherTemperature(): string {
    return this.weather.temperature.toFixed(1) + "°";
  }

  getWeatherType(): string {
    return this.weather.weatherType.description;
  }

  getWeatherSubtitle(): string {
    return "Wind: " + this.weather.wind.toFixed(0) + "km/h" + " | Regen: " + this.weather.rain.toFixed(0) + "mm";
  }

  getWeatherImage() {
    return "../../../assets/flur/types/" + this.weather.weatherType.id + ".png";
  }
}
