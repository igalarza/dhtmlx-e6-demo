
// external libraries
import { init } from 'i18next';

// css imports
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import { MainView } from 'views/main/MainView';

// i18next init method
init({
  nsSeparator: false,
  keySeparator: false,
  debug: true,
  lng: 'en',
  fallbackLng: false,
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json'
  }
}, (err, t) => { 
  // initialized and ready to go!
  const mainView = new MainView(document.body);
});






