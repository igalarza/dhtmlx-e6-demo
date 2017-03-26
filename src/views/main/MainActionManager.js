
import { ActionManager, Action } from 'dhtmlx-e6';

import content from './assets/content.html';
import { LayoutDemoView } from 'views/layouts/LayoutDemoView';

export class MainActionManager extends ActionManager {
	
	constructor (context) {
		super(context);	
		this.addActionObj(new Action('home', this.homeView));
		this.addActionObj(new Action('layoutDemo', this.layoutDemoView));
	}
	
	homeView (params, context) {
		context.html = content;
	}
	
	layoutDemoView (params, context) {
		var layoutDemoView = new LayoutDemoView(context);
	}
}