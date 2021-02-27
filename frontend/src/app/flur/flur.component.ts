import {Component, OnInit} from '@angular/core';
import {FlurService} from "./flur.service";
import {Observation, Weather} from "../shared/model/flur-dtos";

@Component({
  selector: 'app-flur',
  templateUrl: './flur.component.html',
  styleUrls: ['./flur.component.scss']
})
export class FlurComponent implements OnInit {

  public temperatureObservations : Observation[];
  public dischargeObservations : Observation[];
  public levelObservations : Observation[];
  public weather: Weather;

  constructor(private weatherService: FlurService) { }

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData() {
    this.weatherService.getDischarge().subscribe(data => {
      this.dischargeObservations = data;
    });

    this.weatherService.getLevel().subscribe(data => {
      this.levelObservations = data;

    });

    this.weatherService.getTemperature().subscribe(data => {
      this.temperatureObservations = data;

    });

    this.weatherService.getWeather().subscribe(data => {
      console.log(data);
      this.weather = data;
    });
  }


  getWaterTemperatureString(): string {
    const lastObservation = this.temperatureObservations[this.temperatureObservations.length-1];
    return lastObservation.value.toFixed(1) + "°";
  }

  getWaterDischarge(): string {
    const lastObservation = this.dischargeObservations[this.dischargeObservations.length-1];
    return lastObservation.value.toFixed(0);
  }

  getWaterLevel(): string {
    const lastObservation = this.levelObservations[this.levelObservations.length-1];
    return lastObservation.value.toFixed(0) + "mm";
  }
}
