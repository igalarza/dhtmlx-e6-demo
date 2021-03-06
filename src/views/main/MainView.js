
import { PageLayout , TwoColumnsLayout } from 'dhtmlx-e6';

// HTML templates
import headerHtml from './assets/header.html';
import footerHtml from './assets/footer.html';

import { MainActionManager } from './MainActionManager';
import { MainMenu } from './components/MainMenu';
import { MainTree } from './components/MainTree';

export class MainView {
	
	constructor(parentObject) {
		var pageLayout = new PageLayout(parentObject, 100, 25);
		pageLayout.header.html = headerHtml;
		pageLayout.footer.html = footerHtml;
		
		var contentLayout = new TwoColumnsLayout(pageLayout.body);
		contentLayout.left.width = 200;
		
		// The actions affect only the right panel
		var actionManager = new MainActionManager(contentLayout.right); 
		
		// Loads the home content
		actionManager.homeView(null, contentLayout.right);
		
		// Main menu
		var menu = new MainMenu(pageLayout.body, actionManager);	

		// Main tree (left layout)
		var mainTree = new MainTree(contentLayout.left, actionManager);
	}
}