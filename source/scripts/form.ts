import { assignElements, declaration, form, input, options, result, select } from "./elements";
import { optionsInfo } from "./options-info";
import { isOptionForSupport, OptionsForSupport } from "./types";

function onFormSubmit(event: Event) {
  event.preventDefault();
  checkSupport();
}

function onFormChange() {
  result.value = "";
}

function onSelectChange(event: Event) {
  const valueType = (event.target as HTMLInputElement).value;

  if (!isOptionForSupport(valueType))
    throw new Error(`The option vaue "${valueType}" is not in typeMap`);

  setDeclaration(valueType);

  const onSelect = optionsInfo[valueType].onSelect;

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
  const typesNamesOnPage: OptionsForSupport[] = []
  
  for (const option of options) {
    if (!isOptionForSupport(option.value)){
      throw new Error(`Option with name ${option.value} is not part of options Map.`);
    }

    typesNamesOnPage.push(option.value)
  }

  const typeNamesInMap = Object.keys(optionsInfo);

  if (
    typesNamesOnPage.length !== typeNamesInMap.length
  )
    throw new Error("Number of types names on page and in Map are not identical");
}

export function checkSupport() {
  const valueType = select.value;

  if (!isOptionForSupport(valueType))
    throw new Error(`Selected option "${valueType}" is not in typeMap`);

  const userInput = input.value;

  if (userInput.length === 0 && !input.disabled) return;

  result.value = optionsInfo[valueType].isSupported(userInput)
    ? "Supported"
    : "Value not supported or entered incorrectly";
}

export function initFeatureSuport() {
  assignElements()
  checkOptions();

  const defaultValue = select.value;
  if (isOptionForSupport(defaultValue)) setDeclaration(defaultValue);

  form.addEventListener("submit", onFormSubmit);
  select.addEventListener("change", onSelectChange);
  form.addEventListener("change", onFormChange);
  input.addEventListener("input", onFormChange);
}
