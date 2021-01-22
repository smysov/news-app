function newHttpRequest() {
	return {
		get(url, callback) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.addEventListener('load', () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						callback(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					callback(null, response);
				});

				xhr.addEventListener('error', () => {
					callback(`Error. Status code: ${xhr.status}`, xhr);
				});

				xhr.send();
			} catch (error) {
				callback(error);
			}
		},
		post(url, body, headers, callback) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', url);
				xhr.addEventListener('load', () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						callback(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					callback(null, response);
				});

				xhr.addEventListener('error', () => {
					callback(`Error. Status code: ${xhr.status}`, xhr);
				});

				if (headers) {
					Object.entries(headers).forEach(([key, value]) => {
						xhr.setRequestHeader(key, value);
					});
				}

				xhr.send(JSON.stringify(body));
			} catch (error) {
				callback(error);
			}
		},
	};
}

const http = newHttpRequest();

const newService = (function () {
	const apiKey = 'd8d6722d7fbf4a0bacf7552d2be4b0b8';
	const apiUrl = 'https://news-api-v2.herokuapp.com';

	return {
		topHeadLines(country = 'ru', callback) {
			http.get(
				`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`,
				callback,
			);
		},
		everything(query, callback) {
			http.post(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, callback);
		},
	};
})();

document.addEventListener('DOMContentLoaded', function () {
	loadNews();
});

//Load news function
function loadNews() {
	newService.topHeadLines('ru', onGetResponse);
}

//Function on get response from server
function onGetResponse(err, res) {
	renderNews(res.articles);
}

//Function render news
function renderNews(news) {
	const newsContainer = document.querySelector('.news-list');
	const fragment = document.createDocumentFragment();
	news.forEach(newsItem => {
		const element = newsTemplate(newsItem);
		fragment.appendChild(element);
	});
	newsContainer.appendChild(fragment);
}

//News item template function
function newsTemplate({ urlToImage, title, url, description }) {
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
	text.textContent = `${description}`;
	button.textContent = `Read more`;
	button.setAttribute('target', '_blank');
	button.href = `${url}`;

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
