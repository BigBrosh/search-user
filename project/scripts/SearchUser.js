import '../../css/main.css';
import {UserController} from './UserController.js';

class UserList {
	constructor(parent) {
		this.id = 0;
		this.list = {
			name: 'Maks',
			age: 22,
			id: this.id++,
			next: {
				name: 'Maksim',
				age: 33,
				id: this.id++,
				next: null
			}
		}

		this.parent = document.querySelector(parent);
		this.listWrap = document.querySelector(`${parent} .user_list`);
		this.self = this;
		this.showUsers();
		this.controller = new UserController(parent, this.self);
	}

	showUsers(checker = '') {
		this.clearShownList();
		let current = this.list;

		if (current.name == null)
			return false;

		while (current.next) {
			if (current.name.toLowerCase().indexOf(checker.toLowerCase()) != -1)
				this.displayUsers(current, this.listWrap);

			current = current.next;
		}

		if (current.name.toLowerCase().indexOf(checker.toLowerCase()) != -1)
			this.displayUsers(current, this.listWrap);
	}

	displayUsers(cur, parent) {
		let user = document.createElement('div');
			user.setAttribute('class', 'user');
			user.setAttribute('data-id', cur.id);
			user.innerHTML = 	`<div class="remove"></div>User ${cur.name} is ${cur.age} years old <div class='deco'></div>`;

		parent.appendChild(user);
	}

	clearShownList() {
		this.listWrap.innerHTML = '';
	}
}

let userList = new UserList('.first_searcher');