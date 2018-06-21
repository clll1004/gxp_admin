import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import './style.scss';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

console.log('main');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
