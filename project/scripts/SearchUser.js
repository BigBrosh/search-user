import '../../css/main.css';

class UserList {
	constructor() {
		this.list = {
			name: 'Maks',
			age: 22,
			next: null
		}

		this.showUsers();
	}

	showUsers() {
		let current = this.list;

		while (current.next) {
			this.displayUsers(current);
			current = current.next;
		}

		this.displayUsers(current);
	}

	displayUsers(cur) {
		let user = document.createElement('div');
			user.setAttribute('class', 'user');
			user.innerHTML = `User ${cur.name} is ${cur.age} years old`;

		document.getElementById('user_list').appendChild(user);
	}
}

let userList = new UserList();