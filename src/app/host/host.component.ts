import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {Host} from "./host";
import {AgGridAngular} from "ag-grid-angular";
import {HostService} from "./host.service";

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    AgGridAngular
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent implements OnInit {

  gridOptions: GridOptions<Host> = {
    // Row Data: The data to be displayed.
    rowData: [
      {
        name: "",
        game: "",
        complexity: "",
        language: "",
        numberOfPlayers: "",
        anyComments: "",
        estimatedDuration: "",
        numberOfTables: 0,
        coHost: "",
        location: "",
        owner: "",
        itemType: "",
        path: ""
      },
    ],

    // Column Definitions: Defines & controls grid columns.
    columnDefs: [
      {field: "name", headerName: "Name", pinned: 'left', editable: false},
      {field: "game", headerName: "Game", editable: false},
      {field: "complexity", headerName: "Complexity", editable: false},
      {field: "language", headerName: "Language", editable: false},
      {field: "numberOfPlayers", headerName: "Number of players", editable: false},
      {field: "anyComments", headerName: "Any comments?", editable: false},
      {field: "estimatedDuration", headerName: "Estimated duration", editable: false},
      {field: "numberOfTables", headerName: "Number of tables", editable: false},
      {field: "coHost", headerName: "Co-Host", editable: false},
      {field: "location", headerName: "Location", editable: false},
      {field: "owner", headerName: "Owner", editable: false},
      {field: "itemType", headerName: "Item Type", editable: false},
      {field: "path", headerName: "Path", editable: false}
    ],

    autoSizeStrategy: {
      type: 'fitGridWidth'
    },
  }

  private gridApi!: GridApi;

  constructor(
    private hostService: HostService
  ) {
  }

  ngOnInit(): void {
    console.log("Host Component ngOnInit()")
  }

  protected onGridReady(params: GridReadyEvent): void {
    console.log("Host Component onGridReady()", params);
    this.gridApi = params.api;

    this.updateHostTable();
  }

  private updateHostTable(): void {
    console.log("Updating host table.")

    const hosts: Array<Host> = this.hostService.getHosts();
    console.log("Initializing host grid with", hosts);

    this.gridApi.setGridOption('rowData', hosts);
  }

}
