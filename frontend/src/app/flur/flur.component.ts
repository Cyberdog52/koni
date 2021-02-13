import {Component, OnInit} from '@angular/core';
import {FlurService} from "./flur.service";
import {Observation} from "../shared/model/flur-dtos";

@Component({
  selector: 'app-flur',
  templateUrl: './flur.component.html',
  styleUrls: ['./flur.component.scss']
})
export class FlurComponent implements OnInit {

  private stationId : number = 2243;

  private temperatureObservations : Observation[];
  private dischargeObservations : Observation[];
  private levelObservations : Observation[];

  constructor(private weatherService: FlurService) { }

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData() {
    this.weatherService.getDischarge(this.stationId).subscribe(data => {
      this.dischargeObservations = data;
    });

    this.weatherService.getLevel(this.stationId).subscribe(data => {
      this.levelObservations = data;

    });

    this.weatherService.getTemperature(this.stationId).subscribe(data => {
      this.temperatureObservations = data;

    });
  }


}
