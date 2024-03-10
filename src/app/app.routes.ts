import {Routes} from '@angular/router';
import {InputComponent} from "./input/input.component";
import {OutputComponent} from "./output/output.component";
import {PlayerComponent} from "./player/player.component";
import {GuestComponent} from "./guest/guest.component";
import {HostComponent} from "./host/host.component";

export const routes: Routes = [
  {
    path: 'input', component: InputComponent, children: [
      {path: 'player', component: PlayerComponent},
      {path: 'host', component: HostComponent},
      {path: 'guest', component: GuestComponent},
      {path: '', redirectTo: 'player', pathMatch: 'full'}
    ]
  },
  {path: 'output', component: OutputComponent},
  {path: '', redirectTo: 'input', pathMatch: 'full'}
];
