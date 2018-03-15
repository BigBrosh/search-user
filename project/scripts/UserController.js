export class UserController {
	constructor(parent, context) {
		this.context = context;
		this.addingNameField = document.querySelector(`${parent} .name`);
		this.addingAgeField = document.querySelector(`${parent} .age`);
		this.addingButton = document.querySelector(`${parent} .add`);
		this.searchField = document.querySelector(`${parent} .search`);

		this.addingButton.addEventListener('click', () => {
			if (this.checkeFields())
				this.addUser();
		});

		this.searchField.addEventListener('input', (e) => {context.showUsers(e.target.value)});

		document.addEventListener('click', (e) => {
			if (e.target.classList.contains('remove'))
				this.removeUser(e);
		});
	}

	checkeFields() {
		let name = this.addingNameField;
		let age = this.addingAgeField;

		if (name.value === '' && age.value === '')
		{
			name.classList.add('error');
			age.classList.add('error');
			return false;
		}

		else if(name.value === '')
		{
			age.classList.remove('error');
			name.classList.add('error');
			return false;
		}
		
		else if(age.value === '')
		{
			name.classList.remove('error');
			age.classList.add('error');
			return false;
		}

		return true;
	}

	addUser() {
		let name = this.addingNameField;
		let age = this.addingAgeField;

		name.classList.remove('error');
		age.classList.remove('error');

		if (this.context.list.name == null)
		{
			this.context.list.name = name.value;
			this.context.list.age = age.value;
			this.context.list.id = this.context.id;
			this.context.list.next = null;
		}

		else
		{
			let current = this.context.list;

			while(current.next) {
				current = current.next;
			}

			current.next = {
				name: name.value,
				age: age.value,
				id: this.context.id,
				next: null
			}

			this.context.id++;
		}

		this.context.setToLocalStorage();
		this.context.showUsers();
	}

	removeUser(e) {
		let current = this.context.list;
		if (current.next == null && current.id == e.target.parentNode.getAttribute('data-id'))
		{
			current.name = null;
			current.age = null;
			current.id = null;
			current.next = null;
			this.context.setToLocalStorage();
			this.context.clearShownList();
			this.context.showUsers();
			return true;				
		}

		while(current.next) {
			if (current.id == e.target.parentNode.getAttribute('data-id'))
			{
				current.name = current.next.name;
				current.age = current.next.age;
				current.id = current.next.id;
				current.next = current.next.next;
				this.context.setToLocalStorage();
				this.context.clearShownList();
				this.context.showUsers();
				return true;
			}

			else if (current.next.next == null && current.next.id == e.target.parentNode.getAttribute('data-id'))
			{
				current.next = null;
				this.context.setToLocalStorage();
				this.context.clearShownList();
				this.context.showUsers();
				return true;				
			}

			current = current.next;
		}
	}
}