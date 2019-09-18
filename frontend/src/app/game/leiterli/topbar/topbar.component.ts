import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {SideMode} from "../leiterli.component";

@Component({
  selector: 'leiterli-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() leiterliGame: LeiterliGame;
  @Output() sideModeChanged: EventEmitter<SideMode> = new EventEmitter();

  private mode : SideMode = SideMode.None;

  constructor() { }

  ngOnInit() {
  }

  modeClicked() {
    switch (this.mode) {
      case SideMode.None: {
      this.mode = SideMode.Share;
      this.sideModeChanged.emit(this.mode);
      return;
    }
      case SideMode.Share: {
        this.mode = SideMode.Full;
        this.sideModeChanged.emit(this.mode);
        return;
      }
      case SideMode.Full: {
        this.mode = SideMode.None;
        this.sideModeChanged.emit(this.mode);
        return;
      }
    }
  }
}
