export class UserController {
	constructor(parent, context) {
		this.inputField = document.querySelector(`${parent} .search`);
		this.inputField.addEventListener('input', (e) => {context.clearShownList(); context.showUsers(e.target.value)});
	}
}