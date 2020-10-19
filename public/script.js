window.onload = init;

function init() {
	let editButton = document.querySelectorAll('.edit');
	let length = editButton.length;
	for (let i = 0; i < length; i++) {
		editButton[i].onclick = editElement;
	}
}

function editElement(event) {
	event.preventDefault();
	let li = this.parentElement;
	let text = this.parentElement.getElementsByClassName('text')[0];
	let del = this.parentElement.getElementsByTagName('form')[0];
	let newText = document.createElement('input');
	let confirm = document.createElement('input');
	let cancel = document.createElement('input');
	let editForm = document.createElement('form');
	let id = this.parentElement.getElementsByClassName('hide-1')[0].textContent;

	this.style.display = 'none';
	text.style.display = 'none';
	del.style.display = 'none';

	li.appendChild(editForm);
	editForm.appendChild(newText);
	editForm.appendChild(confirm);
	li.appendChild(cancel);

	editForm.setAttribute('method', 'POST');
	editForm.setAttribute('action', '/edit/'+id);
	editForm.setAttribute('class', 'editForm');

	newText.setAttribute('type', 'text');
	newText.setAttribute('value', text.textContent);
	newText.setAttribute('class', 'newText');
	newText.setAttribute('name', 'newtext');

	confirm.setAttribute('type', 'submit');
	confirm.setAttribute('value', 'Ok');
	confirm.setAttribute('class', 'confirm');

	cancel.setAttribute('type', 'submit');
	cancel.setAttribute('value', 'Cancel');
	cancel.setAttribute('class', 'cancel');

	cancel.addEventListener('click', cancelEditing);
}

function cancelEditing() {
	let text = this.parentElement.getElementsByClassName('text')[0];
	let del = this.parentElement.getElementsByTagName('form')[0];
	let edit = this.parentElement.getElementsByClassName('edit')[0];

	text.style.display = 'inline-block';
	del.style.display = 'inline-block';
	edit.style.display = 'inline-block';

	let editForm = this.parentElement.getElementsByClassName('editForm')[0];

	editForm.remove();
	this.remove();
}