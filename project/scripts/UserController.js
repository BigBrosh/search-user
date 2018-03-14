export class UserController {
	constructor(parent) {
		this.inputField = document.querySelector(`${parent} .search`);
		this.inputField.addEventListener('input', (e) => {this.inputListener(e)});
	}

	inputListener(e) {
		console.log(e.target.value);
	}
}