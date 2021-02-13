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

  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [];


  constructor(private weatherService: FlurService) { }

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData() {

    this.chartDatasets = [];
    this.chartColors = [];

    this.weatherService.getDischarge(this.stationId).subscribe(data => {
      this.dischargeObservations = FlurComponent.getEverySecondElement(data);
      this.chartLabels = this.dischargeObservations.map(obs => obs.date);
      this.chartDatasets.push({data: this.dischargeObservations.map(obs => obs.value), label: "Abfluss"});
      this.chartColors.push({
        backgroundColor: 'rgba(0, 137, 132, .2)',
        borderColor: 'rgba(0, 10, 130, .7)',
        borderWidth: 2,

      });
    });

    this.weatherService.getLevel(this.stationId).subscribe(data => {
      this.levelObservations = FlurComponent.getEverySecondElement(data);
      this.chartLabels = this.levelObservations.map(obs => obs.date);
      this.chartDatasets.push({data: this.levelObservations.map(obs => obs.value), label: "Wasserstand"});
      this.chartColors.push({
        backgroundColor: 'rgba(0,166,13,0.2)',
        borderColor: 'rgba(60,200,125,0.7)',
        borderWidth: 2,
      });
    });

    this.weatherService.getTemperature(this.stationId).subscribe(data => {
      this.temperatureObservations = data;
      this.chartLabels = this.temperatureObservations.map(obs => obs.date);
      this.chartDatasets.push({data: this.temperatureObservations.map(obs => obs.value), label: "Temperatur"});
      this.chartColors.push({
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      });
    });


  }

  private static getEverySecondElement(arr: Array<any>): Array<any> {
    const everySecondEntry = [];
    arr.forEach(((value, index) => {
      if (index % 2 == 0) {
        everySecondEntry.push(value);
      }
    }));
    return everySecondEntry;
  }

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
