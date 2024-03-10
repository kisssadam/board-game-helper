import {Component} from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {Guest} from "./guest";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    AgGridAngular
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

  gridOptions: GridOptions<Guest> = {
    // Row Data: The data to be displayed.
    rowData: [
      {
        name: "",
        preferredGame1: "",
        preferredGame2: "",
        preferredGame3: "",
        playWith: "",
        bringGuest: false,
        guestName: "",
        anyComments: "",
        itemType: "",
        path: ""
      },
    ],

    // Column Definitions: Defines & controls grid columns.
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
  }

}
