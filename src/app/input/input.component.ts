import {Component} from '@angular/core';
import {PlayerService} from "../player/player.service";
import {HostService} from "../host/host.service";
import {GuestService} from "../guest/guest.service";
import {read, WorkBook, WorkSheet} from "xlsx";
import {Player} from "../player/player";
import {Host} from "../host/host";
import {Guest} from "../guest/guest";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  inputFile: File | null = null;

  constructor(
    private playerService: PlayerService,
    private hostService: HostService,
    private guestService: GuestService) {
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
    var columns: { [index: string]: [string, string] } = {
      // columns[0]: name of the column in an Excel input.
      // columns[1]: name of the field in interface Player.
      A: ['Name', 'name'],
      B: ['Preferred Game 1', 'preferredGame1'],
      C: ['Preferred Game 2', 'preferredGame2'],
      D: ['Preferred Game 3', 'preferredGame3'],
      E: ['Play With', 'playWith'],
      F: ['Bring guest?', 'bringGuest'],
      G: ['Guest Name', 'guestName'],
      H: ['Any comments?', 'anyComments'],
      I: ['Item Type', 'itemType'],
      J: ['Path', 'path'],
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (playersSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var playerRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        const data: any = playersSheet[column + rowIndex]?.w
        playerRow[columns[column][1]] = data ? data : "";
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
    var columns: { [index: string]: [string, string] } = {
      // columns[0]: name of the column in an Excel input.
      // columns[1]: name of the field in interface Host.
      A: ['Name', 'name'],
      B: ['Game', 'game'],
      C: ['Complexity', 'complexity'],
      D: ['Language', 'language'],
      E: ['# of players', 'numberOfPlayers'],
      F: ['any comments?', 'anyComments'],
      G: ['Estimated Duration', 'estimatedDuration'],
      H: ['# of table(s)', 'numberOfTables'],
      I: ['Co-Host', 'coHost'],
      J: ['Location', 'location'],
      K: ['Owner', 'owner'],
      L: ['Item Type', 'itemType'],
      M: ['Path', 'path'],
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (hostsSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var hostRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        const data: any = hostsSheet[column + rowIndex]?.w;
        hostRow[columns[column][1]] = data ? data : "";
      });
      console.log("Processing host %o", hostRow);

      this.hostService.addHost(hostRow as unknown as Host);

      rowIndex++;
    }

    this.hostService.printHosts();
  }


  private processGuestsSheet(guestsSheet: WorkSheet): void {
    console.log("Processing guests sheet %o", guestsSheet);

    // // we expect the following columns to be present
    var columns: { [index: string]: [string, string] } = {
      // columns[0]: name of the column in an Excel input.
      // columns[1]: name of the field in interface Guest.
      A: ['Name', 'name'],
      B: ['Preferred Game 1', 'preferredGame1'],
      C: ['Preferred Game 2', 'preferredGame2'],
      D: ['Preferred Game 3', 'preferredGame3'],
      E: ['Play With', 'playWith'],
      F: ['Bring guest?', 'bringGuest'],
      G: ['Guest Name', 'guestName'],
      H: ['Any comments?', 'anyComments'],
      I: ['Item Type', 'itemType'],
      J: ['Path', 'path'],
    };

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (guestsSheet['A' + rowIndex]) {
      // var row: {[index: string]: string} = {};
      var guestRow: { [index: string]: string } = {};

      Object.keys(columns).forEach((column: string) => {
        const data: any = guestsSheet[column + rowIndex]?.w;
        guestRow[columns[column][1]] = data ? data : "";
      });
      console.log("Processing guest %o", guestRow);

      this.guestService.addGuest(guestRow as unknown as Guest);

      rowIndex++;
    }

    this.guestService.printGuests();
  }

}
