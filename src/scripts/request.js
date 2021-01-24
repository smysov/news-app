import { loadNews } from './load/load-news';
import { form } from './elements/elements';

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

export const http = newHttpRequest();


form.addEventListener('submit', e => {
	e.preventDefault();
	loadNews();
});

document.addEventListener('DOMContentLoaded', function () {
	loadNews();
});
