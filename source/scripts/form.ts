import { queryElement, queryElements } from "./helpers";

type TypesForSupport = "property" | "custom-properties" | "selector";
type TypeObject = {
  tooltip: string;
  formatValue: (value: string) => string;
  isSupported: (userInput: string) => boolean;
  onSelectChange?: (event: Event) => void;
};

let form: HTMLFormElement;
let select: HTMLInputElement;
let input: HTMLInputElement;
let declaration: HTMLElement;
let result: HTMLInputElement;

const typeMap: Record<TypesForSupport, TypeObject> = {
  property: {
    tooltip:
      "Enter the CSS property and its value separated by a colon, for example 'display: flex'",
    formatValue: (value: string) => value,
    isSupported: (userInput) => {
      const value = typeMap["property"].formatValue(userInput);

      const style = `
            @supports (${value}) {
                .form__result {
                    color: green;
                }
            }

            @supports not (${value}) {
                .form__result {
                    color: tomato;
                }
            }
        `;
      const styleElement = document.createElement("style");
      styleElement.textContent = style;
      document.head.appendChild(styleElement);

      return CSS.supports(value);
    },
  },
  "custom-properties": {
    tooltip: "",
    formatValue: (value: string) => value,
    isSupported: () => {
      const style = `
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `;
      const styleElement = document.createElement("style");
      styleElement.textContent = style;
      document.head.appendChild(styleElement);

      return CSS.supports("color", "var(--primary)");
    },
    onSelectChange: (event) => {
      event.stopPropagation();
      input.value = "";
      input.disabled = true;
      checkSupport();
    },
  },
  selector: {
    tooltip: "Enter a selector, for example ':has(a)'",
    formatValue: (value: string) => `selector(${value})`,
    isSupported: (userInput) => {
      const value = typeMap["selector"].formatValue(userInput);

      const style = `
            @supports (${value}) {
                .form__result {
                    color: green;
                }
            }

            @supports not (${value}) {
                .form__result {
                    color: tomato;
                }
            }
        `;
      const styleElement = document.createElement("style");
      styleElement.textContent = style;
      document.head.appendChild(styleElement);

      return CSS.supports(value);
    },
  },
} as const;

function onFormSubmit(event: Event) {
  event.preventDefault();
  checkSupport();
}

function checkSupport() {
  const valueType = select.value;

  if (!(valueType in typeMap))
    throw new Error(`Selected option "${valueType}" is not in typeMap`);

  const userInput = input.value;

  if (userInput.length === 0 && !input.disabled) return;

  result.value = typeMap[valueType as TypesForSupport].isSupported(userInput)
    ? "Supported"
    : "Value not supported or entered incorrectly";
}

function onFormChange() {
  result.value = "";
}

function onSelectChange(event: Event) {
  const valueType = (event.target as HTMLInputElement).value;

  if (!(valueType in typeMap))
    throw new Error(`The option vaue "${valueType}" is not in typeMap`);

  setDeclaration(valueType as TypesForSupport);

  const onSelectChange = typeMap[valueType as TypesForSupport].onSelectChange;

  if (onSelectChange) {
    onSelectChange(event);
  } else {
    input.disabled = false;
  }
}

function setDeclaration(valueType: TypesForSupport) {
  const text = typeMap[valueType].tooltip;
  declaration.textContent = text;
}

function checkTypes() {
  const options = queryElements<HTMLInputElement>(".form__option");
  const typesNamesOnPage = options.map(
    (option) => option.value
  ) as TypesForSupport[];
  const typeNamesInMap = Object.keys(typeMap);
  const typesNamesSet = new Set([...typesNamesOnPage, ...typeNamesInMap]);

  if (
    typesNamesSet.size !== typesNamesOnPage.length ||
    typesNamesSet.size !== typeNamesInMap.length
  )
    throw new Error("Types names on page and in Map are not identical");
}

export function initFeatureSuport() {
  checkTypes();

  form = queryElement(".form");
  select = queryElement(".form__select");
  input = queryElement(".form__input");
  declaration = queryElement("#input-declaration");
  result = queryElement(".form__result");

  const defaultValue = select.value;

  if (defaultValue in typeMap) setDeclaration(defaultValue as TypesForSupport);

  form.addEventListener("submit", onFormSubmit);
  select.addEventListener("change", onSelectChange);
  form.addEventListener("change", onFormChange);
  input.addEventListener("input", onFormChange);
}
