import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {FieldComponent} from "../field/field.component";

@Component({
  selector: 'leiterli-move-visualisation',
  templateUrl: './move-visualisation.component.html',
  styleUrls: ['./move-visualisation.component.scss']
})
export class MoveVisualisationComponent implements OnInit {

  @Input() history: LeiterliHistoryBlock;

  constructor() { }

  ngOnInit() {
  }

  showAction(): boolean {
    return this.getMoveDifference() != 0
  }

  getMoveDifference(): number {
    if (this.history == null) {
      return 0;
    }
    return this.history.currentField - this.history.previousField - this.history.roll;
  }

  getDiceImage() {
    return "../../../../assets/leiterli/dice/"+ this.history.roll+".png"
  }

  getItemImage() {
    return FieldComponent.itemImage(this.getMoveDifference(),true)
  }


}
