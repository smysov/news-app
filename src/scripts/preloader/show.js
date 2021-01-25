import { sectionFormNews } from '../elements/elements';

export function showPreloader() {
	const section = document.createElement('section')
	const preloader = document.createElement('div');
	section.classList.add('section', 'preloader-news')
	section.appendChild(preloader);
	preloader.classList.add('preloader');
	sectionFormNews.insertAdjacentElement('afterend', section);
}

