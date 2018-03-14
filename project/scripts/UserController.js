export class UserController {
	constructor(parent, context) {
		this.context = context;
		this.addingNameField = document.querySelector(`${parent} .name`);
		this.addingAgeField = document.querySelector(`${parent} .age`);
		this.addingButton = document.querySelector(`${parent} .add`);
		this.searchField = document.querySelector(`${parent} .search`);

		this.addingNameField.classList.add('active');
		this.addingButton.addEventListener('click', () => {this.addUser()});
		this.searchField.addEventListener('input', (e) => {context.showUsers(e.target.value)});
	}

	addUser() {
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
		
		else {
			name.classList.remove('error');
			age.classList.remove('error');

			if (!this.context.list)
			{
				this.context.list = {
					name: name.value,
					age: age.value,
					id: current.id,
					next: null
				}
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

			this.context.showUsers();
		}
	}
}