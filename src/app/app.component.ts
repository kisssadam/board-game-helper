import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AgGridAngular} from "ag-grid-angular";
import {PlayerService} from "./player/player.service";
import {PlayerComponent} from "./player/player.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(playerService: PlayerService) {
  }

}
