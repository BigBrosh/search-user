export class UserController {
	constructor(parent, context) {
		this.searchField = document.querySelector(`${parent} .search`);
		this.searchField.addEventListener('input', (e) => {context.clearShownList(); context.showUsers(e.target.value)});
	}
}