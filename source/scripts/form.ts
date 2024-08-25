import { assignElements, declaration, form, input, options, result, select } from "./elements";
import { optionsInfo } from "./options-info";
import { OptionsForSupport } from "./types";

function onFormSubmit(event: Event) {
  event.preventDefault();
  checkSupport();
}

function onFormChange() {
  result.value = "";
}

function onSelectChange(event: Event) {
  const valueType = (event.target as HTMLInputElement).value;

  if (!(valueType in optionsInfo))
    throw new Error(`The option vaue "${valueType}" is not in typeMap`);

  setDeclaration(valueType as OptionsForSupport);

  const onSelect = optionsInfo[valueType as OptionsForSupport].onSelect;

  if (onSelect) {
    onSelect(event);
  } else {
    input.disabled = false;
  }
}

function setDeclaration(valueType: OptionsForSupport) {
  const text = optionsInfo[valueType].tooltip;
  declaration.textContent = text;
}

function checkOptions() {
  const typesNamesOnPage = options.map(
    (option) => option.value
  ) as OptionsForSupport[];
  const typeNamesInMap = Object.keys(optionsInfo);
  const typesNamesSet = new Set([...typesNamesOnPage, ...typeNamesInMap]);

  if (
    typesNamesSet.size !== typesNamesOnPage.length ||
    typesNamesSet.size !== typeNamesInMap.length
  )
    throw new Error("Types names on page and in Map are not identical");
}

export function checkSupport() {
  const valueType = select.value;

  if (!(valueType in optionsInfo))
    throw new Error(`Selected option "${valueType}" is not in typeMap`);

  const userInput = input.value;

  if (userInput.length === 0 && !input.disabled) return;

  result.value = optionsInfo[valueType as OptionsForSupport].isSupported(userInput)
    ? "Supported"
    : "Value not supported or entered incorrectly";
}

export function initFeatureSuport() {
  assignElements()
  checkOptions();

  const defaultValue = select.value;
  if (defaultValue in optionsInfo) setDeclaration(defaultValue as OptionsForSupport);

  form.addEventListener("submit", onFormSubmit);
  select.addEventListener("change", onSelectChange);
  form.addEventListener("change", onFormChange);
  input.addEventListener("input", onFormChange);
}
