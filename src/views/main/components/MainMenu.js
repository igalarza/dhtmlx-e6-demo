
import { Menu, MenuItem } from 'dhtmlx-e6';


/**
 * The menu defines only the visualization of the actions,
 * the actions themselves are defined in the ActionManager.
 */
export class MainMenu extends Menu {
	
	constructor(container, actionManager) {
		
		super(container, actionManager);
		
		this.addMenuItem(actionManager.createMenuItem(null, 'home', 'Home'));
		this.addTextContainer('layouts', 'Layouts');
		this.addMenuItem(actionManager.createMenuItem('layouts', 'test', 'Test'));	

	}

}