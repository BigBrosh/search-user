import '../../css/main.css';
import {UserController} from './UserController.js';

class UserList {
	id = 0;
	list = {
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

	context = this;
	parentName = '.first_searcher';
	listWrap = document.querySelector(`.first_searcher .user_list`);

	controller = new UserController;

	setControllerContext = () => {
		this.controller.setContext(this.context);
	}

	showUsers = (checker = '') => {
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

	displayUsers = (cur, parent) => {
		let user = document.createElement('div');
			user.setAttribute('class', 'user');
			user.setAttribute('data-id', cur.id);
			user.innerHTML = 	`<div class="remove"></div>User ${cur.name} is ${cur.age} years old <div class='deco'></div>`;

		this.listWrap.appendChild(user);
	}

	clearShownList = () => {
		this.listWrap.innerHTML = '';
	}

	getFromLocalStorage = () => {
		if (localStorage.getItem('userList'))
			this.list = JSON.parse(localStorage.getItem('userList'));
	}

	setToLocalStorage = () => {
		localStorage.setItem('userList', JSON.stringify(this.list));
	}
}

let userList = new UserList;

userList.getFromLocalStorage();
userList.showUsers();
userList.controller.addListeners();
userList.setControllerContext();