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

      this.hostService.addHost(hostRow as unknown as Host);

      rowIndex++;
    }

    this.hostService.printHosts();
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

      this.guestService.addGuest(guestRow as unknown as Guest);

      rowIndex++;
    }

    this.guestService.printGuests();
  }

}
