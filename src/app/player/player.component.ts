import {Component, OnInit} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {Player} from "./player";
import {PlayerService} from "./player.service";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {

  gridOptions: GridOptions<Player> = {
    rowData: [{
      name: "adam",
      preferredGame1: "",
      preferredGame2: "",
      preferredGame3: "",
      playWith: "",
      bringGuest: "",
      guestName: "",
      anyComments: "",
      itemType: "",
      path: ""
    } as Player],

    columnDefs: [
      {field: "name", headerName: "Name", pinned: 'left', editable: false},
      {field: "preferredGame1", headerName: "Preferred Game 1", editable: false},
      {field: "preferredGame2", headerName: "Preferred Game 2", editable: false},
      {field: "preferredGame3", headerName: "Preferred Game 3", editable: false},
      {field: "playWith", headerName: "Play With", editable: false},
      {field: "bringGuest", headerName: "Bring guest?", editable: false},
      {field: "guestName", headerName: "Guest Name", editable: false},
      {field: "anyComments", headerName: "Any comments?", editable: false},
      {field: "itemType", headerName: "Item Type", editable: false},
      {field: "path", headerName: "Path", editable: false}
    ],

    autoSizeStrategy: {
      type: 'fitGridWidth'
    },
  };

  private gridApi!: GridApi;

  constructor(
    private playerService: PlayerService
  ) {
  }

  ngOnInit(): void {
    console.log("Player Component ngOnInit()")
  }

  protected onGridReady(params: GridReadyEvent): void {
    console.log("Player Component onGridReady()", params);
    this.gridApi = params.api;

    this.updatePlayerTable();
  }

  private updatePlayerTable(): void {
    console.log("Updating player table.")

    const players: Array<Player> = this.playerService.getPlayers();
    console.log("Initializing player grid with", players);

    this.gridApi.setGridOption('rowData', players);
  }

}
