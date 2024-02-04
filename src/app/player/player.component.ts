import {Component} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {GridOptions, ProcessDataFromClipboardParams} from "ag-grid-community";
import {Player} from "./player";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  gridOptions: GridOptions<Player> = {
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
      {field: "name", headerName: "Name", pinned: 'left'},
      {field: "preferredGame1", headerName: "Preferred Game 1"},
      {field: "preferredGame2", headerName: "Preferred Game 2"},
      {field: "preferredGame3", headerName: "Preferred Game 3"},
      {field: "playWith", headerName: "Play With"},
      {field: "bringGuest", headerName: "Bring guest?"},
      {field: "guestName", headerName: "Guest Name"},
      {field: "anyComments", headerName: "Any comments?"},
      {field: "itemType", headerName: "Item Type"},
      {field: "path", headerName: "Path"}
    ],

    autoSizeStrategy: {
      type: 'fitGridWidth'
    },

    processDataFromClipboard: this.processDataFromClipboard
  }

  processDataFromClipboard(
    params: ProcessDataFromClipboardParams
  ): string[][] | null {
    const data = [...params.data];
    const emptyLastRow =
      data[data.length - 1][0] === '' && data[data.length - 1].length === 1;
    console.log(data);
    if (emptyLastRow) {
      data.splice(data.length - 1, 1);
    }
    const firstRow = data[0];

    const excelHeaderMap = {
      "name": firstRow.indexOf("Name"),
      "preferredGame1": firstRow.indexOf("Preferred Game 1"),
      "preferredGame2": firstRow.indexOf("Preferred Game 2"),
      "preferredGame3": firstRow.indexOf("Preferred Game 3"),
      "playWith": firstRow.indexOf("Play With"),
      "bringGuest": firstRow.indexOf("Bring guest?"),
      "guestName": firstRow.indexOf("Guest Name"),
      "anyComments": firstRow.indexOf("Any comments?"),
      "itemType": firstRow.indexOf("Item Type"),
      "path": firstRow.indexOf("Path")
    }

    console.log(excelHeaderMap);

    const lastIndex = params.api!.getModel().getRowCount() - 1;
    const focusedCell = params.api!.getFocusedCell();
    const focusedIndex = focusedCell!.rowIndex;

    if (focusedIndex + data.length - 1 > lastIndex) {
      const resultLastIndex = focusedIndex + (data.length - 1);
      const numRowsToAdd = resultLastIndex - lastIndex;

      const rowsToAdd: any[] = [];
      for (let i = 0; i < numRowsToAdd; i++) {
        console.log("data: ");
        console.log(data);

        data.forEach(row => {
          console.log("row:");
          console.log(row);
        })

        // const index = data.length - 1;
        // const row = data.slice(index, index + 1)[0];
        //
        // Create row object
        // const rowObject: any = {};
        // let currentColumn: any = focusedCell!.column;
        // console.log("Row:")
        // console.log(row);
        // row.forEach((item) => {
        //   if (!currentColumn) {
        //     return;
        //   }
        //   console.log("currentColumn.colDef.field:");
        //   console.log(currentColumn.colDef.field);
        //   console.log("item:");
        //   console.log(item);
        //   switch (currentColumn.colDef.field) {
        //     case "name":
        //     const a = excelHeaderMap[currentColumn.colDef.field]
        //     console.log("name:" + data[1])
        //     break;
          // }
          // console.log(item);
          // rowObject[currentColumn.colDef.field] = item;
          // currentColumn = params.api!.getDisplayedColAfter(currentColumn);
        // });

        // rowsToAdd.push(rowObject);
      }

      params.api!.applyTransaction({add: rowsToAdd});
    }

    return data;
  }

}
