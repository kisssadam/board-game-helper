import {Component} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {ColDef} from "ag-grid-community";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  // Row Data: The data to be displayed.
  rowData = [

    // {make: "Tesla", model: "Model Y", price: 64950, electric: true},
    // {make: "Ford", model: "F-Series", price: 33850, electric: false},
    // {make: "Toyota", model: "Corolla", price: 29600, electric: false},
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {field: "Name"},
    {field: "Preferred Game 1"},
    {field: "Preferred Game 2"},
    {field: "Preferred Game 3"},
    {field: "Play With"},
    {field: "Bring guest?"},
    {field: "Guest Name"},
    {field: "Any comments?"},
    {field: "Item Type"},
    {field: "Path"}
  ];

}
