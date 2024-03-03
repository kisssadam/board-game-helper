import {Injectable} from '@angular/core';
import {Player} from "./player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Array<Player> = [];

  constructor() {
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  printPlayers(): void {
    console.log("Players %o", this.players);
  }

}
