import {Component, OnInit} from '@angular/core';
import {GameService} from "../shared/game.service";
import {GameType} from "../shared/model/dtos";
import {Router} from "@angular/router";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
  }

  isWerwoerter() : Boolean {
    if (this.gameService.currentGame == null || this.gameService.currentGame.gameType == null) {
      return false;
    }
    return this.gameService.currentGame.gameType == GameType.WERWOERTER;
  }

  isSecret() : Boolean {
    if (this.gameService.currentGame == null || this.gameService.currentGame.gameType == null) {
      return false;
    }
    return this.gameService.currentGame.gameType == GameType.SECRET;
  }

  isWerwoelfle() : Boolean {
    if (this.gameService.currentGame == null || this.gameService.currentGame.gameType == null) {
      return false;
    }
    return this.gameService.currentGame.gameType == GameType.WERWOELFLE;
  }

  getGameName(): string {
    const game = this.gameService.currentGame;
    if (game == null) {
      this.router.navigateByUrl("/lobby");
      return "Kein Spiel gefunden";
    } else {
      return game.name;
    }

  }

  getNumberOfPlayers(): number {
    const game = this.gameService.currentGame;
    if (game == null) {
      console.log("No game found");
      this.router.navigateByUrl("/lobby");
      return 0;
    } else {
      return game.players.length;
    }
  }

  isLeiterli() {
    if (this.gameService.currentGame == null || this.gameService.currentGame.gameType == null) {
      return false;
    }
    return this.gameService.currentGame.gameType == GameType.LEITERLI;
  }
}
