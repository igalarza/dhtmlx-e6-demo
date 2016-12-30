
import { ActionManager, Action } from 'dhtmlx-e6';

import content from './assets/content.html';

export class MainActionManager extends ActionManager {
	
	constructor (context) {
		super(context);	
		this.addAction(new Action('home', this.homeView));
		this.addAction(new Action('test', this.otherView));
	}
	
	homeView (context) {
		context.html = content;
	}
	
	otherView (context) {
		context.html = '';
	}
}