import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ColDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Row Data: The data to be displayed.
  rowData = [
    {make: "Tesla", model: "Model Y", price: 64950, electric: true},
    {make: "Ford", model: "F-Series", price: 33850, electric: false},
    {make: "Toyota", model: "Corolla", price: 29600, electric: false},
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {field: "make"},
    {field: "model"},
    {field: "price"},
    {field: "electric"}
  ];
}