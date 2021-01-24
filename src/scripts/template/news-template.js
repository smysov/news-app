//News item template function
export function newsTemplate({ urlToImage, title, url, description }) {
	const item = document.createElement('li');
	const card = document.createElement('div');
	const imageContainer = document.createElement('div');
	const image = document.createElement('img');
	const headerContainer = document.createElement('div');
	const header = document.createElement('h3');
	const textContainer = document.createElement('div');
	const text = document.createElement('p');
	const buttonContainer = document.createElement('div');
	const button = document.createElement('a');

	//Adding classes
	item.classList.add('news-list__item');
	card.classList.add('card');
	imageContainer.classList.add('card__image-inner');
	image.classList.add('card__image');
	headerContainer.classList.add('card__title-inner');
	header.classList.add('card__title');
	textContainer.classList.add('card__description');
	text.classList.add('card__text');
	buttonContainer.classList.add('card__inner-button');
	button.classList.add('card__link');

	//Adding content
	image.src = urlToImage;
	header.textContent = title;
	text.textContent = description;
	button.textContent = `Read more`;
	button.setAttribute('target', '_blank');
	button.href = url;

	item.appendChild(card);
	card.appendChild(imageContainer);
	card.appendChild(textContainer);
	card.appendChild(buttonContainer);
	imageContainer.appendChild(image);
	imageContainer.appendChild(headerContainer);
	headerContainer.appendChild(header);
	textContainer.appendChild(text);
	buttonContainer.appendChild(button);
	return item;
}
