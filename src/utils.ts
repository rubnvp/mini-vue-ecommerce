export function pluralize(text: string, count: number, suffix = 's') {
  return count === 1 ? text : text + suffix;
}
