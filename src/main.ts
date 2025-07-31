import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appRouterProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  
  providers: [provideHttpClient() ,appRouterProviders]
});