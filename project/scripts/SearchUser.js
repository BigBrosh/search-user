import '../../css/main.css';

class UserList {
	constructor() {
		this.list = {
			name: 'Maks',
			next: null
		}

		this.showUsers();
	}

	showUsers() {
		let current = this.list;

		while (current.next) {
			console.log(current.name);
			current = current.next;
		}

		console.log(current.name);
	}
}

let userList = new UserList();