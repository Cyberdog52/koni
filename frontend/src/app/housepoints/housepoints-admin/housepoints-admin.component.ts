import {Component, OnInit} from '@angular/core';
import {House, HousePointHistory} from "../../shared/model/housepoints-dtos";
import {HousePointsService} from "../housepoints.service";
import {take} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-housepoints-admin',
  templateUrl: './housepoints-admin.component.html',
  styleUrls: ['./housepoints-admin.component.css']
})
export class HousepointsAdminComponent implements OnInit {

  houses : House[] = [House.SLYTHERIN, House.RAVENCLAW, House.GRYFFINDOR, House.HUFFLEPUFF];
  selectedHouse : House;
  selectedPoints: number = 0;
  selectedReason: string = '';
  houseEnum = House;

  constructor(private housePointsService : HousePointsService,
              private toastrService: ToastrService) {

  }

  ngOnInit(): void {
  }

  update(): void {
    if (this.selectedHouse == null || this.selectedPoints == 0 || this.selectedReason == null || this.selectedReason.length == 0) {
      console.log(this.selectedHouse);
      console.log(this.selectedPoints);
      console.log(this.selectedReason);
      console.log("missing input");
      return;
    }

    const newHistory = new HousePointHistory(House[this.selectedHouse], this.selectedReason, this.selectedPoints);
    this.housePointsService.updateHistory(newHistory)
      .pipe(take(1))
      .subscribe(response => {
        console.log("Saved history: ", response);
        this.toastrService.success("Gespeichert");
      });

    this.selectedHouse = null;
    this.selectedPoints = 0;
    this.selectedReason = '';
  }

  addPoints(number: number) {
    this.selectedPoints += number;
  }

  selectHouse(house: House) {
    this.selectedHouse = house;
  }
}
