import { Component, OnInit } from '@angular/core';
import {GameService} from "../../shared/game.service";

@Component({
  selector: 'secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }



}
