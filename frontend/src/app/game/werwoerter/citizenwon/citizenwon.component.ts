import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame} from "../../../shared/model/werwoerter-dtos";

@Component({
  selector: 'citizenwon',
  templateUrl: './citizenwon.component.html',
  styleUrls: ['./citizenwon.component.scss']
})
export class CitizenwonComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;

  constructor() { }

  ngOnInit() {
  }

}
