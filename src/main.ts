/// <reference types="@angular/localize" />

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import 'ag-grid-enterprise'
import {LicenseManager} from "ag-grid-enterprise";

LicenseManager.setLicenseKey("");

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
