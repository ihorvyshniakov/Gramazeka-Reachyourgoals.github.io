const printMousePos = (e, isItMobile = false) => {
	let img = document.createElement('img');
	img.src='./files/cracked-glass.png';
	img.alt='broken glass';

	let glassItem = document.createElement('div');
	glassItem.classList.add('glassBox');
	glassItem.classList.add('cracked');

	glassItem.appendChild(img);
	document.body.prepend(glassItem);

	if(isItMobile){
		glassItem.style.top = e.touches[0].clientY + 'px';
		glassItem.style.left = e.touches[0].clientX + 'px';
	} else {
		glassItem.style.top = e.clientY + 'px';
		glassItem.style.left = e.clientX + 'px';
	}
	crackingAudio.pause();
	crackingAudio.currentTime = 0;
	crackingAudio.play();
};

if (window.innerWidth > 768) {
	document.addEventListener('mousedown', printMousePos);
} else {
	document.addEventListener('touchstart', e => printMousePos(e, true));
}