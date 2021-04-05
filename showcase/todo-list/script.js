// Construcor of new tasks
class NewTask {
	constructor(id, text) {
		this.id = id;
		this.text = text;
		this.checked = false;
		this.element;
	}

	addToList() {
		$('.list p').before(`<div class="list__item"><input type="checkbox" id="e${this.id}" onchange="$('#e${this.id}')[0].toggleAttribute('checked'); check(this.id.slice(1), this)"><label for="e${this.id}">${this.text}</label><span class="close"></span></div>`);
		this.element = $(`#e${this.id}`).closest('.list__item')[0].outerHTML;
		taskArray.addTask(this);
	}

	get check() {
		return this.checked
	}

	set check(checkIt) {
		this.checked = checkIt
	}
}

// clickAddCounter for btn 'Add'
var clickAddCounter = 1;
// Array with all objects(tasks)
var taskArray = [];
// add to taskArray & to localStorage
Array.prototype.addTask = obj => {
	taskArray.push(obj);
	localStorage.setItem('taskArray', JSON.stringify(taskArray));
}
// delete obj with id from taskArray&localStorage
Array.prototype.deleteTaskWithId = id => {
	// set taskArray & localStorage
	taskArray = taskArray.filter(el => el.id != id);
	localStorage.setItem('taskArray', JSON.stringify(taskArray));
}
// edit checkbox status/element at taskArray & to localStorage
Array.prototype.editTaskWithId = (id, isChecked = null, element) => {
	if (isChecked != null) {
		// set checked status of object
		if (taskArray.find((el) => el.id == id).check != isChecked) {
			taskArray.find((el) => el.id == id).check = isChecked;
		}
	} else {
		if (taskArray.find((el) => el.id == id)) {
			taskArray.find((el) => el.id == id).element = element;
		}
	}
	localStorage.setItem('taskArray', JSON.stringify(taskArray));
}
// clear taskArray & localStorage
Array.prototype.clearArray = () => {
	taskArray = [];
	localStorage.setItem('taskArray', '');
}

// ___CLICK FUNCTIONALITY
// Button 'Add' - create new item with input text after click
function btnAdd() {
	$('[type=submit]').on('click', () => {
		clickAddCounter++;

		// checking of empty input
		let inputText = $('[type=text]').val().trim();
		if (inputText.length != 0) {
			// addItem(clickAddCounter, inputText);
			new NewTask(clickAddCounter, inputText).addToList()
		}

		$('[type=text]').val('');
	})
}

// Button 'Clear' - delete all tasks UI
function btnClear() {
	$('[type=button]').on('click', () => {
		$('.list__item').remove();
		taskArray.clearArray();
	})
}

// Checkboxes
// line-through text if checked+set localStorage
function check(id, element) {
	let isChecked = element.checked;
	// set checked status of object
	taskArray.editTaskWithId(id, isChecked);
	// set element to obj
	taskArray.editTaskWithId(id, null, element.closest('.list__item').outerHTML);
}

// Button 'X' -> delete task
function btnX() {
	// Async checker of nodes quantity changes
	let observerNodes = new MutationObserver(mutationRecords => {
		listenerClickDelete($('.close'));
	});

	observerNodes.observe(list, {
		childList: true
	});

	// check click delete status
	function listenerClickDelete(el) {
		el.on('mousedown', (e) => {
			remove(e)
		})
	}

	function remove(e) {
		// find .list__item that must be deleted
		let neededId = $(e.target).siblings('input').attr('id').slice(1);
		// delete it from taskArray&localStorage
		taskArray.deleteTaskWithId(neededId)
		// delete task UI
		e.target.closest('.list__item').remove();
	}
}

// ___BEGIN CODE
// turn on all button listeners
btnAdd();
btnClear();
btnX();

$(window).on('load', () => {
	if (localStorage.getItem('taskArray') == null || localStorage.getItem('taskArray') == '') {
		// show first task
		new NewTask(clickAddCounter, 'Add some new tasks to this list').addToList();
	} else {
		// set taskArray from localStorage data
		taskArray = JSON.parse(localStorage.getItem('taskArray'));
		// set clickAddCounter from localStorage data
		clickAddCounter = taskArray[taskArray.length - 1].id;
		// show on the page all tasks
		taskArray.forEach(el => {
			$('.list p').before(el.element)
		})
	}
})