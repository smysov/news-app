import { newsTemplate } from '../template/news-template';
import { changeUrlImage } from '../change/change-image';
import { clearContainer } from '../clear/clear-container';

//Function render news
export function renderNews(news) {

	const urlImage = './assets/images/content/no-image.jpg';
	const newsContainer = document.querySelector('.news-list');
	const fragment = document.createDocumentFragment();

	if (newsContainer.children.length) {
		clearContainer(newsContainer);
	}

	news.forEach(newsItem => {
		if (!newsItem.urlToImage) {
			newsItem.urlToImage = urlImage;
		}

		if (!newsItem.description) {
			newsItem.description = 'No description available';
		}

		const element = newsTemplate(newsItem);
		fragment.appendChild(element);
	});
	newsContainer.appendChild(fragment);

	changeUrlImage(urlImage);
}
