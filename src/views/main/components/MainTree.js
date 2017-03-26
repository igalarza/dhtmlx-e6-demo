

import { BaseTree, TreeItem } from 'dhtmlx-e6';
import { t } from 'i18next';

export class MainTree extends BaseTree {
	
	constructor (container, actionManager) {
		super(container, actionManager);
		
		this.addItem(actionManager.createTreeItem(null, 'home', t('Home')));
		this.addItem(actionManager.createTreeItem(null, 'layouts',  t('Layouts')));
		this.addItem(actionManager.createTreeItem('layouts', 'layoutDemo',  t('Layout')));
	}
}