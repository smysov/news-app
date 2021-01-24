import { renderNews } from '../render/render-news';
import { renderOverlay } from '../overlay/render-overlay';

//Function on get response from server
export function onGetResponse(err, res) {
	if (err) {
		//show error xml status
		return;
	}

	if (!res.articles.length) {
		renderOverlay();
	}

	renderNews(res.articles);
}
