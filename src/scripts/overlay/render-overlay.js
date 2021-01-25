import { hideOverlay } from './hide-overlay';

export function renderOverlay() {
	const fragment = document.createDocumentFragment();
	const overlay = document.createElement('div');
	const content = document.createElement('div');
	const title = document.createElement('h3');
	const text = document.createElement('p');
	const button = document.createElement('button');

	//Adding classes
	overlay.classList.add('overlay');
	content.classList.add('overlay__content');
	title.classList.add('overlay__title');
	text.classList.add('overlay__text');
	button.classList.add('overlay__button');

	title.textContent = `Nothing was found`;
	text.textContent = `Choose a different category`;
	button.textContent = `Close`;

	overlay.appendChild(content);
	content.appendChild(title);
	content.appendChild(text);
	content.appendChild(button);

	fragment.appendChild(overlay);

	document.body.appendChild(fragment);

	hideOverlay(overlay);
}
