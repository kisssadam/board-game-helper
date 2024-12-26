/// <reference types="@angular/localize" />

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import 'ag-grid-enterprise'

import {ModuleRegistry, provideGlobalGridOptions} from 'ag-grid-community';
import {AllEnterpriseModule, LicenseManager} from 'ag-grid-enterprise';

LicenseManager.setLicenseKey('');

// Register all enterprise features
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({theme: "legacy"});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
