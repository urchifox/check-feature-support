export function queryElement<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: HTMLElement
): T {
  const element = (parent ?? document).querySelector<T>(selector)

  if (!element) throw Error(`Element "${selector}" not found`)

  if (!(element instanceof HTMLElement)) throw Error(`Element "${selector}" is not an HTMLElement`)

  return element;
}

export function queryElements<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: HTMLElement
): T[] {
  return [...(parent ?? document).querySelectorAll<T>(selector)];
}
