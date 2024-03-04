import {Injectable} from '@angular/core';
import {Guest} from "./guest";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Array<Guest> = [];

  constructor() {
  }

  addGuest(guest: Guest): void {
    this.guests.push(guest);
  }

  getGuests(): Array<Guest> {
    return this.guests;
  }

  printGuests(): void {
    console.log("Guests %o", this.guests);
  }

}
