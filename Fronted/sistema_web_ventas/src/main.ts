import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, appConfig } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers]
}).catch(err => console.error(err));