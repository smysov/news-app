import { renderNews } from '../render/render-news';

//Function on get response from server
export function onGetResponse(err, res) {
	if (err) {
		//show error xml status
		return;
	}

	if (!res.articles.length) {
		//show empty news
	}

	renderNews(res.articles);
}
