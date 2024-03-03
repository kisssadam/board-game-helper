import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AgGridAngular} from "ag-grid-angular";
import {PlayerService} from "./player/player.service";
import {PlayerComponent} from "./player/player.component";
import {read, WorkBook, WorkSheet} from 'xlsx';
import {Player} from "./player/player";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  inputFile: File | null = null;

  constructor(private playerService: PlayerService) {
  }

  onFileSelected(event: any) {
    console.log("Event %o", event);
    this.inputFile = event.target.files[0];
    console.log("Input file selected: %o", this.inputFile);
  }

  regenerate() {
    if (!this.inputFile) {
      console.log("Input file is not selected.");
      return;
    }

    console.log("Reading file %o", this.inputFile);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      const workbook: WorkBook = read(fileReader.result, {type: 'binary'});
      console.log("Read workbook %o", workbook);
      this.populateGrid(workbook);
    });
    fileReader.readAsBinaryString(this.inputFile);
  }

  populateGrid(workbook: WorkBook): void {
    console.log("Sheet names: %o", workbook.SheetNames);

    const playersSheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]]
    const hostsSheet: WorkSheet = workbook.Sheets[workbook.SheetNames[1]];
    const guestsSheet: WorkSheet = workbook.Sheets[workbook.SheetNames[2]];

    this.processPlayersSheet(playersSheet)
    this.processHostsSheet(hostsSheet);
    this.processGuestsSheet(guestsSheet);
  }

  private processPlayersSheet(playersSheet: WorkSheet): void {
    console.log("Processing players sheet %o", playersSheet);

    // // we expect the following columns to be present
    var columns: { [index: string]: string } = {
      A: 'Name',
      B: 'Preferred Game 1',
      C: 'Preferred Game 2',
      D: 'Preferred Game 3',
      E: 'Play With',
      F: 'Bring guest?',
      G: 'Guest Name',
      H: 'Any comments?',
      I: 'Item Type',
      J: 'Path',
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (playersSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var playerRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        playerRow[columns[column]] = playersSheet[column + rowIndex]?.w;
      });
      console.log("Processing player %o", playerRow);

      this.playerService.addPlayer(playerRow as unknown as Player);

      rowIndex++;
    }
    this.playerService.printPlayers();
  }

  private processHostsSheet(hostsSheet: WorkSheet): void {
    console.log("Processing hosts sheet %o", hostsSheet);

    // // we expect the following columns to be present
    var columns: { [index: string]: string } = {
      A: 'Name',
      B: 'Game',
      C: 'Complexity',
      D: 'Language',
      E: '# of players',
      F: 'any comments?',
      G: 'Estimated Duration',
      H: '# of table(s)',
      I: 'Co-Host',
      J: 'Location',
      K: 'Owner',
      L: 'Item Type',
      M: 'Path',
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (hostsSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var hostRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        hostRow[columns[column]] = hostsSheet[column + rowIndex]?.w;
      });
      console.log("Processing host %o", hostRow);

      // TODO do something with hosts.
      // this.playerService.addPlayer(hostRow as unknown as Player);

      rowIndex++;
    }

    // TODO do something with hosts.
    // this.playerService.printPlayers();
  }


  private processGuestsSheet(guestsSheet: WorkSheet): void {
    console.log("Processing guests sheet %o", guestsSheet);

    // // we expect the following columns to be present
    var columns: { [index: string]: string } = {
      A: 'Name',
      B: 'Preferred Game 1',
      C: 'Preferred Game 2',
      D: 'Preferred Game 3',
      E: 'Play With',
      F: 'Bring guest?',
      G: 'Guest Name',
      H: 'Any comments?',
      I: 'Item Type',
      J: 'Path',
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (guestsSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var guestRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        guestRow[columns[column]] = guestsSheet[column + rowIndex]?.w;
      });
      console.log("Processing guest %o", guestRow);

      // TODO do something with guests.
      // this.playerService.addPlayer(guestRow as unknown as Player);

      rowIndex++;
    }

    // TODO do something with guests.
    // this.playerService.printPlayers();
  }


}
