import '../../css/main.css';
import {UserController} from './UserController.js';

class UserList {
	constructor(parent) {
		this.list = {
			name: 'Maks',
			age: 22,
			next: {
				name: 'Maksim',
				age: 33,
				next: null
			}
		}

		this.parent = document.querySelector(parent);
		this.controller = new UserController(parent);
		this.showUsers();
	}

	showUsers() {
		let current = this.list;

		while (current.next) {
			this.displayUsers(current, this.parent);
			current = current.next;
		}

		this.displayUsers(current, this.parent);
	}

	displayUsers(cur, parent) {
		let user = document.createElement('div');
			user.setAttribute('class', 'user');
			user.innerHTML = `User ${cur.name} is ${cur.age} years old`;

		parent.appendChild(user);
	}
}

let userList = new UserList('.first_searcher');