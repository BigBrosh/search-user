export class UserController {
	addingNameField = document.querySelector(`.first_searcher .name`);
	addingAgeField = document.querySelector(`.first_searcher .age`);
	addingButton = document.querySelector(`.first_searcher .add`);
	searchField = document.querySelector(`.first_searcher .search`);

	addListeners = () => {
		this.addingButton.addEventListener('click', () => this.addingUser());		
		this.searchField.addEventListener('input', e => this.context.showUsers(e.target.value));
		document.addEventListener('click', (e) => this.removeUser(e));	
	}

	addingUser = () => {
		if (this.checkFields())
			this.addUser();
	}

	setContext = value => {
		this.context = value;
	}

	checkFields = () => {
		let name = this.addingNameField;
		let age = this.addingAgeField;

		if (name.value === '' && age.value === '')
		{
			name.classList.add('error');
			age.classList.add('error');
			return false;
		}

		else if (name.value === '')
		{
			name.classList.add('error');

			if (age.value === '' || age.value.search(/^\d+$/) === -1)
				age.classList.add('error');
			else
				age.classList.remove('error');

			return false;
		}
		
		else if (age.value === '' || age.value.search(/^\d+$/) === -1)
		{
			if (name.value === '')
				name.classList.add('error');	
			else
				name.classList.remove('error');

			age.classList.add('error');
			return false;
		}

		return true;
	}

	addUser = () => {
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

	removeUser = (e) => {
		if (e.target.classList.contains('remove'))
		{
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
}