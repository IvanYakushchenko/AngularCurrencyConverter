import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { ConverterComponent } from './pages/converter/converter';
import { AboutComponent } from './pages/about/about';
import { HistoryComponent } from './pages/history/history';

export const routes: Routes = [
  { path: '', redirectTo: 'converter', pathMatch: 'full' },
  { path: 'converter', component: ConverterComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'about', component: AboutComponent },
];

export const appRouterProviders = [provideRouter(routes)];