

import { BaseTree, TreeItem } from 'dhtmlx-e6';

export class MainTree extends BaseTree {
	
	constructor (container, actionManager) {
		super(container, actionManager);
		
		this.addItem(actionManager.createTreeItem(null, 'home', 'Home'));
		this.addItem(actionManager.createTreeItem('home', 'home-child1', 'Home child 1'));
		this.addItem(actionManager.createTreeItem(null, 'test', 'Test'));
	}
}