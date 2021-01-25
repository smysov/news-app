import { renderNews } from '../render/render-news';
import { renderOverlay } from '../overlay/render-overlay';
import { removePreloader } from '../preloader/remove';

//Function on get response from server
export function onGetResponse(err, res) {
	removePreloader();
	if (err) {
		//show error xml status
		return;
	}

	if (!res.articles.length) {
		renderOverlay();
	}

	renderNews(res.articles);
}
