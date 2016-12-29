
// Using bulma flex library, see:
// http://bulma.io/
// import "../node_modules/bulma/css/bulma.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';

// HTML templates
import headerHtml from './assets/header.html';
import footerHtml from './assets/footer.html';

import { PageLayout , TwoColumnsLayout } from 'dhtmlx-e6';


var pageLayout = new PageLayout(document.body, 100, 25);
var twoColumns = new TwoColumnsLayout(pageLayout.body);

pageLayout.header.html = headerHtml;
pageLayout.footer.html = footerHtml;