export function hideOverlay(overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.tagName === 'BUTTON') {
      overlay.remove()
    }
  })
}