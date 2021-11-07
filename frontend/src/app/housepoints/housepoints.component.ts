import {Component, OnDestroy, OnInit} from '@angular/core';
import {HousePointsService} from "./housepoints.service";
import {HousePointResponse} from "../shared/model/housepoints-dtos";
import {mergeMap, take, takeUntil} from "rxjs/operators";
import {interval, ReplaySubject} from "rxjs";

@Component({
  selector: 'housepoints',
  templateUrl: './housepoints.component.html',
  styleUrls: ['./housepoints.component.css']
})
export class HousepointsComponent implements OnInit, OnDestroy {

  constructor(private housePointService: HousePointsService) { }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  housePoints: HousePointResponse;

  ngOnInit(): void {
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
        console.log(response);
        this.housePoints = response;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
