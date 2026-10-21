// Tiny event bus for the overlays: any button can open the request modal
// (optionally with a service preselected) or the menu.
export const openRequest = (service) => window.dispatchEvent(new CustomEvent('nim:request', { detail: { service } }))
export const openMenu = () => window.dispatchEvent(new Event('nim:menu'))
