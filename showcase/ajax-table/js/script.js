// Check browser 4 accessing webp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}

});

// ___________

// TODO: loading state

$(window).on('load', function () {
	// if just reload show same country and counter checkbox
	if (localStorage.getItem('country') != null) {
		var country = localStorage.getItem('country');
		table(country);
	}

	if (localStorage.getItem('checkedNum') != '' && localStorage.getItem('checkedNum') != null) {
		var checkedNum = localStorage.getItem('checkedNum').split(',');
	} else {
		var checkedNum;
	}

	// button send - Choose another country
	$('#send').on('click', function () {
		var country = $('#textarea').val().trim().toLowerCase();
		table(country);
	})

	// button clear
	$('#clear').on('click', function () {
		$('#textarea').val('');
		$('#counter').remove();
		$('.table').remove();
		localStorage.setItem('country', '');
		localStorage.setItem('countryOld', '');
		localStorage.setItem('checked', '');
		checkedNum = localStorage.setItem('checkedNum', '');
	});

	// show table
	function table(country) {
		// if don't empty textarea->show
		if (country != '') {
			$.ajax('http://universities.hipolabs.com/search?country=' + country, {
				success: function (data) {
					// WRONG INPUT->show error message
					if (data == undefined || data == null || data.length == 0) {
						alert('В данной базе не существует такой страны либо университетов в ней. Исправьте, пожалуйста, ошибку либо введите другую страну.');
						return
					}

					// counter of checkbox div
					$('#counter').remove();

					// if localStorage have checked->show checked from localStorage
					if (localStorage.getItem('checked') != null && localStorage.getItem('checked') != '') {
						// if change country reset checkbox counter
						if (localStorage.getItem('countryOld') != country) {
							localStorage.setItem('checked', '');
							checkedNum = localStorage.setItem('checkedNum', '');
							$('body').append('<div id="counter"><p id="count">0</p></div>');
						} else {
							$('body').append('<div id="counter"><p id="count">' + localStorage.getItem('checked') + '</p></div>');
						}
					} else {
						$('body').append('<div id="counter"><p id="count">0</p></div>');
					}

					$('.table').remove();
					dataLength = Object.keys(data[0]).length + 1;

					// create table
					$('body').append('<div class="table"><table border="1" cellspacing="0" cellpadding="10" cols=' + dataLength + '></table></div>');
					$('table').append('<tr></tr>');

					// verify first checkbox status
					if (checkedNum != undefined) {
						if (checkedNum.indexOf('1') != -1) {
							var checked1 = 'checked'
						} else {
							var checked1 = ''
						}
					}

					// first row
					for (let i = 0; i < dataLength; i++) {
						switch (i) {
							case 0:
								$('table>tr').append('<th>&nbsp;</th>');
								$('table>tr').append('<th>' + Object.keys(data[0])[i] + '</th>');
								break;
							case dataLength - 1:
								$('table>tr').append('<th>Save to my list<br><input type="checkbox" name="check" class="all" id="c1" ' + checked1 + '></th>');
								break;
							default:
								$('table>tr').append('<th>' + Object.keys(data[0])[i] + '</th>');
						}
					}

					// rest of row
					data.forEach(function (el, indexOfData) {
						// create row
						$('table').append('<tr></tr>');
						var indexOfData2 = indexOfData + 2;

						// verify first checkbox status
						if (checkedNum != undefined) {
							if (checkedNum.indexOf(String(indexOfData2)) != -1) {
								var checked = 'checked'
							} else {
								var checked = ''
							}
						}

						// fill row with cells
						for (let i = 0; i < dataLength; i++) {
							switch (i) {
								case 0:
									$('table>tr:nth-child(' + indexOfData2 + ')').append('<td>' + ++indexOfData + '</td>');
									$('table>tr:nth-child(' + indexOfData2 + ')').append('<td><a href="' + Object.values(el)[i] + '">' + Object.values(el)[i] + '</a></td>');
									break;
								case dataLength - 1:
									$('table>tr:nth-child(' + indexOfData2 + ')').append('<td><input type="checkbox" name="check" class="checkbox"  id="c' + indexOfData2 + '" ' + checked + '></td>');
									break;
								default:
									$('table>tr:nth-child(' + indexOfData2 + ')').append('<td>' + Object.values(el)[i] + '</td>');
							}
						}
					})
					// checked checkbox checker
					Checker();
				}
			});
			localStorage.setItem('country', country);
		}
	}

	// Counter for checkboxes
	function Checker() {
		var n = 0;
		var checkedArray = [];
		n = localStorage.getItem('checked');
		if (localStorage.getItem('checkedNum') != null) {
			checkedArray = localStorage.getItem('checkedNum').split(',');
			checkedArray.forEach(function (el, i) {
				checkedArray[i] = Number(el)
			})
		}
		choosing(n, checkedArray);
	}

	function choosing(n, checkedArray) {
		// choose one
		$('.checkbox').on('change', function () {
			if (this.checked) {
				// flag .active for chosen checkboxes
				$(this).addClass('active');
				checkedArray.push(Number($(this).attr('id').slice(1)));

				n++;
				localStorage.setItem('checked', n);
				// sort from less to more
				checkedArray = checkedArray.sort(function (a, b) {
					return a - b;
				});
				localStorage.setItem('checkedNum', checkedArray);
				$('#count').text(n);
			} else {
				// flag .active for chosen checkboxes
				$(this).removeClass('active');
				checkedArray.splice(checkedArray.indexOf(Number($(this).attr('id').slice(1))), 1);

				n--;
				localStorage.setItem('checked', n);
				// sort from less to more
				checkedArray = checkedArray.sort(function (a, b) {
					return a - b;
				});
				localStorage.setItem('checkedNum', checkedArray);
				$('#count').text(n);
			}
		})
		// choose all
		$('.all').on('change', function () {
			if (this.checked) {
				// flag .active for all chosen checkboxes
				$('[type="checkbox"]').addClass('active');
				checkedArray = [];
				for (let i = 1; i <= $('[type="checkbox"].active').length; i++) {
					checkedArray.push(i)
				}

				$('[type="checkbox"]').prop('checked', true);
				n = $('.checkbox').length;
				localStorage.setItem('checked', n);
				localStorage.setItem('checkedNum', checkedArray);
				$('#count').text(n);
			} else {
				// flag .active for all unchosen checkboxes
				$('[type="checkbox"]').removeClass('active');
				checkedArray = [];

				$('[type="checkbox"]').prop('checked', false);
				n = 0;
				localStorage.setItem('checked', n);
				localStorage.setItem('checkedNum', checkedArray);
				$('#count').text(n);
			}
		})
	}

	countryOld = localStorage.setItem('countryOld', country);
})