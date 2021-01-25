//Function change url image
export function changeUrlImage(url) {
	const imageList = document.querySelectorAll('.card__image');
	imageList.forEach(image => {
		image.onerror = () => image.setAttribute('src', `${url}`);
	});
}
