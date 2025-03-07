export const title = "Element-Plus-Vite-Admin"

export function getPageTitle(pageTitle: unknown) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
