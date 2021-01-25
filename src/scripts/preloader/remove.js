export function removePreloader() {
	const loader = document.querySelector('.preloader-news');
	if (loader) {
		loader.remove();
	}
}
