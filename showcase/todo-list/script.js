// TODO: Adaptive
// TODO: add localStorage
// TODO: change object status

class NewTask {
	constructor(id, text) {
		this.id = id;
		this.text = text;
		this.checked = false;
		this.deleted = false;
		this.element;
	}

	addToList() {
		$('.list p').before(`<div class="list__item"><input type="checkbox" id="e${this.id}"><label for="e${this.id}">${this.text}</label><span class="close"></span></div>`);
		this.element = $(`#e${this.id}`).closest('.list__item');
	}

	get check() {
		return this.checked
	}

	set delete(removeIt) {
		this.deleted = removeIt
	}

	set check(checkIt) {
		this.checked = checkIt
	}
}

// Array with all objects(tasks)
var taskArray = [];
// clickCounter for btn 'Add'
var clickCounter = 1;

// Button 'Add' - create new item with input text after click
$('[type=submit]').on('click', () => {
	clickCounter++;

	// checking of empty input
	let inputText = $('[type=text]').val().trim();
	if (inputText.length != 0) {
		// addItem(clickCounter, inputText);
		this['task' + clickCounter] = new NewTask(clickCounter, inputText);
		this['task' + clickCounter].addToList()
		taskArray.push(this['task' + clickCounter])
	}

	$('[type=text]').val('');
})

// Button 'Clear' - delete all tasks UI
$('[type=button]').on('click', () => {
	$('.list__item').remove();
})

// check changes on the page
setInterval(() => {
	// check checkbox status 
	$('[type="checkbox"]').change((e) => {
		check(e)
	})
}, 500)

// line-through text if checked
function check(e) {
	// find .list__item that must be deleted
	let neededId = e.target.id.slice(1);
	let taskId = 'task' + neededId;

	console.log(this[taskId].check);

	// set checked status of object
	if (this[taskId].check == false) {
		this[taskId].check = true;
	} else {
		this[taskId].check = false;
	}

	// checked UI
	$('input').removeClass('checked');
	$('input:checked').addClass('checked');
}

let observerNodes = new MutationObserver(() => {
	// check delete status 
	$('.close').on('click', (e) => {
		remove(e)
	})
});

observerNodes.observe(list, {
	childList: true
});

// Button 'X' -> delete task
function remove(e) {
	// find .list__item that must be deleted
	let neededId = $(e.target).siblings('input').attr('id').slice(1);
	let taskId = 'task' + neededId;
	// set status to deleted object
	this[taskId].delete = true;

	// delete task UI
	e.target.closest('.list__item').remove();
}







// ------ Code to begin

// show first task
this['task' + clickCounter] = new NewTask(clickCounter, 'Add some new tasks to this list');
this['task' + clickCounter].addToList();