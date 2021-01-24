import { form } from './elements/elements';
import { onGetResponse } from './response/response-from-server';
import { selectCountry, searchInput } from './elements/elements';

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
			http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, callback);
		},
	};
})();

form.addEventListener('submit', e => {
	e.preventDefault();
	loadNews();
});

document.addEventListener('DOMContentLoaded', function () {
	loadNews();
});

//Load news function
function loadNews() {
	const country = selectCountry.value;
	const searchText = searchInput.value;

	if (!searchText) {
		newService.topHeadLines(country, onGetResponse);
	} else {
		newService.everything(searchText, onGetResponse);
	}
}
