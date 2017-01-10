
import { ActionManager, Action } from 'dhtmlx-e6';

import content from './assets/content.html';

export class MainActionManager extends ActionManager {
	
	constructor (context) {
		super(context);	
		this.addActionObj(new Action('home', this.homeView));
		this.addActionObj(new Action('test', this.otherView));
	}
	
	homeView (params, context) {
		context.html = content;
	}
	
	otherView (params, context) {
		context.html = '';
	}
}