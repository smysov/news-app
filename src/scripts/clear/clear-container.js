//Function clear container
export function clearContainer(container) {
	let child = container.lastElementChild;
	while (child) {
		container.removeChild(child);
		child = container.lastElementChild;
	}
}
