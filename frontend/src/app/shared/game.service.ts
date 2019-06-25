import { Injectable } from '@angular/core';
import {Game} from "./model/dtos";


@Injectable({
  providedIn: 'root'
})
export class GameService {

  public currentGame : Game;

  subscribe(game: Game) {
    console.log("Subscribed: ", game);
  }

  constructor(){
  }

  unsubscribe(game: Game) {
    console.log("Unsubscribed: ", game);
  }
}
