const printMousePos = e => {
	glassBox.style.top = e.clientY + 'px';
	glassBox.style.left = e.clientX + 'px';
	glassBox.classList.add('cracked');
	crackingAudio.play();
};

document.addEventListener('click', printMousePos);
