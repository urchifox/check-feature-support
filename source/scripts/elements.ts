import { queryElement, queryElements } from "./helpers";

export let form: HTMLFormElement;
export let select: HTMLInputElement;
export let input: HTMLInputElement;
export let declaration: HTMLElement;
export let result: HTMLInputElement;
export let options: HTMLOptionElement[];

export function assignElements() {
  form = queryElement<HTMLFormElement>(".form");
  select = queryElement<HTMLInputElement>(".form__select");
  input = queryElement<HTMLInputElement>(".form__input");
  declaration = queryElement<HTMLElement>("#input-declaration");
  result = queryElement<HTMLInputElement>(".form__result");
  options = queryElements<HTMLOptionElement>(".form__option");
}
