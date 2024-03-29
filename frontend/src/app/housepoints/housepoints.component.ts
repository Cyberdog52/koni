import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HousePointsService} from "./housepoints.service";
import {House, HousePointHistory, HousePointResponse} from "../shared/model/housepoints-dtos";
import {mergeMap, take, takeUntil} from "rxjs/operators";
import {interval, ReplaySubject} from "rxjs";

@Component({
  selector: 'housepoints',
  templateUrl: './housepoints.component.html',
  styleUrls: ['./housepoints.component.scss']
})
export class HousepointsComponent implements OnInit, OnDestroy {
  housePointHistory: HousePointHistory[] = [];

  constructor(private housePointService: HousePointsService) { }

  maxPixel = 580.0;
  maxPoints = 580;
  scaleFactor = 1.0;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  housePoints: HousePointResponse;


  ngOnInit(): void {
    document.body.style.backgroundColor = "black";
    this.setIntervalToPullHousePoints();
  }

  private setIntervalToPullHousePoints() {
    interval(5 * 1000)
      .pipe(
        takeUntil(this.destroyed$),
        mergeMap(() => this.housePointService.getHousePoints())
      )
      .subscribe(response => {
        if (this.housePoints != null && response.gryffindor == this.housePoints.gryffindor && response.slytherin == this.housePoints.slytherin && response.hufflepuff == this.housePoints.hufflepuff && response.ravenclaw == this.housePoints.ravenclaw) {
          console.log("nothing changed");
          return;
        }

        if (response.gryffindor > this.maxPoints) {
          this.maxPoints = response.gryffindor;
          this.scaleFactor = this.maxPixel / this.maxPoints;
        }

        if (response.slytherin > this.maxPoints) {
          this.maxPoints = response.slytherin;
          this.scaleFactor = this.maxPixel / this.maxPoints;
        }

        if (response.hufflepuff > this.maxPoints) {
          this.maxPoints = response.hufflepuff;
          this.scaleFactor = this.maxPixel / this.maxPoints;
        }

        if (response.ravenclaw > this.maxPoints) {
          this.maxPoints = response.ravenclaw;
          this.scaleFactor = this.maxPixel / this.maxPoints;
        }

        console.log(response);
        this.housePoints = response;

        this.loadHistory();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getGryffindorHeight(): string {
    return Math.floor(this.housePoints.gryffindor * this.scaleFactor) + 'px';
  }

  getGryffindorMarginTop(): string {
    const padding = 655 - Math.floor(this.housePoints.gryffindor * this.scaleFactor);
    return  padding + 'px';
  }

  getSlytherinHeight(): string {
    return Math.floor(this.housePoints.slytherin * this.scaleFactor) + 'px';
  }

  getSlytherinMarginTop(): string {
    const padding = 655 - Math.floor(this.housePoints.slytherin * this.scaleFactor);
    return  padding + 'px';
  }

  getRavenclawHeight(): string {
    return Math.floor(this.housePoints.ravenclaw * this.scaleFactor) + 'px';
  }

  getRavenclawMarginTop(): string {
    const padding = 655 - Math.floor(this.housePoints.ravenclaw * this.scaleFactor);
    return  padding + 'px';
  }

  getHufflepuffHeight(): string {
    return Math.floor(this.housePoints.hufflepuff * this.scaleFactor) + 'px';
  }

  getHufflepuffMarginTop(): string {
    const padding = 655 - Math.floor(this.housePoints.hufflepuff * this.scaleFactor);
    return  padding + 'px';
  }

  loadHistory(): void {
    this.housePointService.getHistory().subscribe(history => {
      this.housePointHistory = history.slice(Math.max(history.length - 3, 0)).reverse();
    })
  }

  getBadgeUrlForHouse(house: House): string {

    switch(house) {
      case House.GRYFFINDOR: return "../../assets/housepoints/gryffindor.png";
      case House.SLYTHERIN: return "../../assets/housepoints/slytherin.png";
      case House.HUFFLEPUFF: return "../../assets/housepoints/hufflepuff.png";
      case House.RAVENCLAW: return "../../assets/housepoints/ravenclaw.png";
    }

  }
}
