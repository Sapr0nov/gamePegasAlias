export const decodeHtml = (string: string): string => {
  return string
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, '"')
}
