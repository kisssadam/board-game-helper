import {Injectable} from '@angular/core';
import {Player} from "./player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players: Array<Player> = [];

  constructor() {
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  getPlayers(): Array<Player> {
    return this.players;
  }

  printPlayers(): void {
    console.log("Players %o", this.players);
  }

}
